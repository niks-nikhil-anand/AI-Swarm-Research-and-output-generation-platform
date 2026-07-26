import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUserId } from "../../../../lib/auth";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  const chat = await prisma.chat.findFirst({
    where: { id, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

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
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  let body: { title?: string; pinned?: boolean; model?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const existing = await prisma.chat.findFirst({ where: { id, userId } });
  if (!existing) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

  const chat = await prisma.chat.update({
    where: { id },
    data: {
      ...(body.title !== undefined ? { title: body.title.trim() || existing.title } : {}),
      ...(body.pinned !== undefined ? { pinned: body.pinned } : {}),
      ...(body.model !== undefined ? { model: body.model?.trim() || null } : {}),
    },
  });

  return NextResponse.json({
    chat: {
      id: chat.id,
      title: chat.title,
      model: chat.model,
      pinned: chat.pinned,
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
    },
  });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await params;
  const chat = await prisma.chat.findFirst({ where: { id, userId } });
  if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

  await prisma.chat.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
