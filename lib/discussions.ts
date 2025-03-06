import type { Discussion } from "@/types/discussion"

let discussions: Discussion[] = []

export function getDiscussions(): Discussion[] {
  return discussions
}

export function getDiscussionById(id: number): Discussion | undefined {
  return discussions.find((discussion) => discussion.id === id)
}

export function createDiscussion(discussion: Omit<Discussion, "id">): Discussion {
  const newDiscussion = { ...discussion, id: discussions.length + 1 }
  discussions.push(newDiscussion)
  return newDiscussion
}

export function updateDiscussion(id: number, updates: Partial<Discussion>): Discussion | undefined {
  const index = discussions.findIndex((discussion) => discussion.id === id)
  if (index !== -1) {
    discussions[index] = { ...discussions[index], ...updates }
    return discussions[index]
  }
  return undefined
}

export function deleteDiscussion(id: number): boolean {
  const initialLength = discussions.length
  discussions = discussions.filter((discussion) => discussion.id !== id)
  return discussions.length < initialLength
}

