"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Review } from "@/types/review"

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews")
    if (response.ok) {
      const data = await response.json()
      setReviews(data)
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    const response = await fetch(`/api/reviews?id=${reviewId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      fetchReviews()
      toast({
        title: "Review deleted",
        description: "The review has been successfully deleted.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Management</CardTitle>
        <CardDescription>Manage user reviews for products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{review.title}</p>
                <p className="text-sm text-muted-foreground">
                  By User {review.userId} for Phone {review.phoneId}
                </p>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

