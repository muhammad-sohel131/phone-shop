import { Discussion, Reply } from "@/models/Model";
import { TDiscussion, TReply } from "./db";

let discussions: TDiscussion[] = [];

export async function getDiscussions(filters: Record<string, any> = {}) {
  const res = await Discussion.find(filters);
  return res;
}

export async function getDiscussionById(id: string) {
  return await Discussion.findOne({ _id: id });
}

export async function createDiscussion(discussion: Omit<TDiscussion, "id">) {
  const res = await Discussion.create(discussion);
  return res;
}

export function updateDiscussion(
  id: string,
  updates: Partial<TDiscussion>
): TDiscussion | undefined {
  const index = discussions.findIndex((discussion) => discussion._id === id);
  if (index !== -1) {
    discussions[index] = { ...discussions[index], ...updates };
    return discussions[index];
  }
  return undefined;
}

export function deleteDiscussion(id: string): boolean {
  const initialLength = discussions.length;
  discussions = discussions.filter((discussion) => discussion._id !== id);
  return discussions.length < initialLength;
}

export async function addReply(reply: TReply) {
  const res = await Reply.create(reply);
  return res;
}

export async function getReplies(discussionId: string) {
  const res = Reply.find({ discussionId: discussionId });
  return res;
}
