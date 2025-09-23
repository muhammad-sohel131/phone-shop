// app/api/discussions/[id]/replies/route.ts
import { addReply, getReplies } from "@/lib/discussions";
import { NextResponse } from "next/server";

// POST /api/discussions/:id/replies
export async function POST(
  request: Request
) {
  try {
    const body =  await request.json();
    const res = await addReply(body) 

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit reply" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const discussionId = searchParams.get("discussionId");

  if (!discussionId) {
    return NextResponse.json(
      { error: "discussionId query param required" },
      { status: 400 }
    );
  }

  const replies = await getReplies(discussionId);
  if (!replies) {
    return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
  }

  return NextResponse.json(replies);
}
