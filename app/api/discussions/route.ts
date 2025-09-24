import { NextResponse } from "next/server";
import {
  getDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from "@/lib/discussions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: Record<string, any> = {};

  if (searchParams.get("discussionId")) {
    filters._id = searchParams.get("discussionId");
  }
  if (searchParams.get("userId")) {
    filters.userId = searchParams.get("userId");
  }
  if (searchParams.get("status")) {
    filters.status = searchParams.get("status");
  }
  const discussions = await getDiscussions(filters);
  return NextResponse.json(discussions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newDiscussion = createDiscussion(body);
  console.log(newDiscussion);
  return NextResponse.json(newDiscussion, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  const updatedDiscussion = updateDiscussion(id, updates);
  if (updatedDiscussion) {
    return NextResponse.json(updatedDiscussion);
  }
  return NextResponse.json({ error: "Discussion not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const deleted = deleteDiscussion(id);
    if (deleted) {
      return NextResponse.json({ message: "Discussion deleted successfully" });
    }
    return NextResponse.json(
      { error: "Discussion not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
