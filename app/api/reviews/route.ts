import { NextResponse } from "next/server"
import { getReviews, createReview, updateReview, deleteReview } from "@/lib/reviews"

export async function GET(request: Request) {
  const reviews = getReviews()
  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newReview = createReview(body)
  return NextResponse.json(newReview, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body
  const updatedReview = updateReview(id, updates)
  if (updatedReview) {
    return NextResponse.json(updatedReview)
  }
  return NextResponse.json({ error: "Review not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    const deleted = deleteReview(Number.parseInt(id, 10))
    if (deleted) {
      return NextResponse.json({ message: "Review deleted successfully" })
    }
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

