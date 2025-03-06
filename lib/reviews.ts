import type { Review } from "@/types/review"

let reviews: Review[] = []

export function getReviews(): Review[] {
  return reviews
}

export function getReviewById(id: number): Review | undefined {
  return reviews.find((review) => review.id === id)
}

export function createReview(review: Omit<Review, "id">): Review {
  const newReview = { ...review, id: reviews.length + 1 }
  reviews.push(newReview)
  return newReview
}

export function updateReview(id: number, updates: Partial<Review>): Review | undefined {
  const index = reviews.findIndex((review) => review.id === id)
  if (index !== -1) {
    reviews[index] = { ...reviews[index], ...updates }
    return reviews[index]
  }
  return undefined
}

export function deleteReview(id: number): boolean {
  const initialLength = reviews.length
  reviews = reviews.filter((review) => review.id !== id)
  return reviews.length < initialLength
}

