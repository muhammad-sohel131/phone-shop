import { TReview } from "./db"


let reviews: TReview[] = []

export function getReviews(): TReview[] {
  return reviews
}

export function getReviewById(id: number): TReview | undefined {
  return reviews.find((review) => review._id === id)
}

export function createReview(review: Omit<TReview, "id">): TReview {
  const newReview = { ...review, id: reviews.length + 1 }
  reviews.push(newReview)
  return newReview
}

export function updateReview(id: number, updates: Partial<TReview>): TReview | undefined {
  const index = reviews.findIndex((review) => review._id === id)
  if (index !== -1) {
    reviews[index] = { ...reviews[index], ...updates }
    return reviews[index]
  }
  return undefined
}

export function deleteReview(id: number): boolean {
  const initialLength = reviews.length
  reviews = reviews.filter((review) => review._id !== id)
  return reviews.length < initialLength
}

