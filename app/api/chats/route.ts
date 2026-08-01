import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getCurrentUserId } from "../../../lib/auth";

function jsonError(error: unknown, fallback: string, status = 500) {
  const detail = error instanceof Error ? error.message : fallback;
  return NextResponse.json({ error: process.env.NODE_ENV === "production" ? fallback : detail }, { status });
}

function titleFromMessage(content: string): string {
  const clean = content.replace(/\s+/g, " ").trim();
  if (!clean) return "New AI Nexus chat";
  return clean.length <= 52 ? clean : `${clean.slice(0, 49).trimEnd()}...`;
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated. Please sign in again." }, { status: 401 });

    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
      include: {
        messages: { orderBy: { createdAt: "asc" } },
        _count: { select: { messages: true } },
      },
    });

    return NextResponse.json({
      chats: chats.map((chat) => ({
        id: chat.id,
        title: chat.title,
        model: chat.model,
        pinned: chat.pinned,
        createdAt: chat.createdAt.toISOString(),
        updatedAt: chat.updatedAt.toISOString(),
        messageCount: chat._count.messages,
        messages: chat.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          model: message.model,
          tokens: message.tokens,
          createdAt: message.createdAt.toISOString(),
        })),
      })),
    });
  } catch (error) {
    return jsonError(error, "Could not load chats");
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: "Not authenticated. Please sign in again." }, { status: 401 });

    let body: { title?: string; model?: string; firstMessage?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const title = body.title?.trim() || titleFromMessage(body.firstMessage || "");
    const chat = await prisma.chat.create({
      data: {
        userId,
        title,
        model: body.model?.trim() || null,
        ...(body.firstMessage?.trim()
          ? {
              messages: {
                create: {
                  role: "user",
                  content: body.firstMessage.trim(),
                  model: body.model?.trim() || null,
                  tokens: Math.max(1, Math.round(body.firstMessage.trim().length / 4.2)),
                },
              },
            }
          : {}),
      },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    return NextResponse.json({
      chat: {
        id: chat.id,
        title: chat.title,
        model: chat.model,
        pinned: chat.pinned,
        createdAt: chat.createdAt.toISOString(),
        updatedAt: chat.updatedAt.toISOString(),
        messages: chat.messages.map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          model: message.model,
          tokens: message.tokens,
          createdAt: message.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    return jsonError(error, "Could not create chat");
  }
}
