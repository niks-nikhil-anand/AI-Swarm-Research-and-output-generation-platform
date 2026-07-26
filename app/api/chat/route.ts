import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getCurrentUserId } from "../../../lib/auth";
import { OPENROUTER_FREE_MODELS } from "../../../lib/constants/openrouterFreeModels";

type Role = "user" | "assistant" | "system";
type RequestMessage = { role: Role; content: string };

const DEFAULT_MODEL = "openai/gpt-oss-20b:free";
const SYSTEM_PROMPT = "You are AI Nexus Chat inside AI Swarm. Help the user reason, plan research, summarize evidence, and turn ideas into swarm-ready project goals. Be concise, practical, and source-aware.";

function isMessage(value: unknown): value is RequestMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<RequestMessage>;
  return (
    (message.role === "user" || message.role === "assistant" || message.role === "system") &&
    typeof message.content === "string"
  );
}

function resolveModel(model: unknown): string {
  if (typeof model !== "string" || !model.trim()) return DEFAULT_MODEL;
  const requested = model.trim();
  return OPENROUTER_FREE_MODELS.some((item) => item.id === requested) ? requested : requested;
}

function estimateTokens(content: string): number {
  return Math.max(1, Math.round(content.length / 4.2));
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: { chatId?: string; model?: unknown; messages?: unknown; stream?: unknown; temperature?: unknown; top_p?: unknown; max_tokens?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.chatId) return NextResponse.json({ error: "chatId is required" }, { status: 400 });
  if (!Array.isArray(body.messages) || body.messages.length === 0 || !body.messages.every(isMessage)) {
    return NextResponse.json({ error: "messages must be a non-empty array of chat messages" }, { status: 400 });
  }

  const chat = await prisma.chat.findFirst({ where: { id: body.chatId, userId } });
  if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

  const model = resolveModel(body.model || chat.model || DEFAULT_MODEL);
  const lastMessage = body.messages[body.messages.length - 1];
  if (lastMessage.role !== "user") return NextResponse.json({ error: "Last message must be from the user" }, { status: 400 });

  await prisma.chatMessage.create({
    data: {
      chatId: chat.id,
      role: "user",
      content: lastMessage.content,
      model,
      tokens: estimateTokens(lastMessage.content),
    },
  });

  await prisma.chat.update({
    where: { id: chat.id },
    data: { model, title: chat.title === "New AI Nexus chat" ? lastMessage.content.slice(0, 52) : chat.title },
  });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const content = "OpenRouter is not configured yet. Add OPENROUTER_API_KEY to the server environment to enable live AI Nexus Chat responses.";
    const assistant = await prisma.chatMessage.create({
      data: { chatId: chat.id, role: "assistant", content, model, tokens: estimateTokens(content) },
    });
    return NextResponse.json({
      content,
      message: {
        id: assistant.id,
        role: assistant.role,
        content: assistant.content,
        model: assistant.model,
        tokens: assistant.tokens,
        createdAt: assistant.createdAt.toISOString(),
      },
    });
  }

  const upstreamMessages = body.messages[0]?.role === "system"
    ? [{ ...body.messages[0], content: `${body.messages[0].content}\n\n${SYSTEM_PROMPT}` }, ...body.messages.slice(1)]
    : [{ role: "system" as const, content: SYSTEM_PROMPT }, ...body.messages];

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AI Swarm",
    },
    body: JSON.stringify({
      model,
      messages: upstreamMessages,
      temperature: typeof body.temperature === "number" ? body.temperature : 0.7,
      top_p: typeof body.top_p === "number" ? body.top_p : 0.95,
      max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : 2048,
      stream: false,
    }),
  });

  if (!upstream.ok) {
    const data = await upstream.json().catch(() => null);
    return NextResponse.json({ error: data?.error?.message || `OpenRouter request failed with status ${upstream.status}` }, { status: upstream.status });
  }

  const data = await upstream.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "OpenRouter returned an empty response" }, { status: 502 });
  }

  const assistant = await prisma.chatMessage.create({
    data: { chatId: chat.id, role: "assistant", content, model, tokens: estimateTokens(content) },
  });
  await prisma.chat.update({ where: { id: chat.id }, data: { updatedAt: new Date() } });

  return NextResponse.json({
    content,
    message: {
      id: assistant.id,
      role: assistant.role,
      content: assistant.content,
      model: assistant.model,
      tokens: assistant.tokens,
      createdAt: assistant.createdAt.toISOString(),
    },
  });
}
