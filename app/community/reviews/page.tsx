"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { reviews, phones } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"

export default function ReviewsPage() {
  const [reviewList, setReviewList] = useState(reviews)
  const [newReview, setNewReview] = useState({ phoneId: "", rating: 0, title: "", content: "" })
  const { user } = useAuth()
  const { toast } = useToast()

  const handleNewReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to write a review.",
        variant: "destructive",
      })
      return
    }

    const newReviewItem = {
      id: reviewList.length + 1,
      userId: user.id,
      phoneId: Number.parseInt(newReview.phoneId),
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      pros: [],
      cons: [],
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
    }

    setReviewList([newReviewItem, ...reviewList])
    setNewReview({ phoneId: "", rating: 0, title: "", content: "" })

    toast({
      title: "Review submitted",
      description: "Your review has been posted successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Reviews</h1>

      {user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewReview} className="space-y-4">
              <Select
                value={newReview.phoneId}
                onValueChange={(value) => setNewReview({ ...newReview, phoneId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a phone" />
                </SelectTrigger>
                <SelectContent>
                  {phones.map((phone) => (
                    <SelectItem key={phone.id} value={phone.id.toString()}>
                      {phone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= newReview.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
              <Input
                placeholder="Review Title"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Write your review here..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
              />
              <Button type="submit">Submit Review</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {reviewList.map((review) => (
          <Card key={review.id}>
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/3 h-[200px] md:h-auto">
                <Image src="/placeholder.svg" alt={`Phone ${review.phoneId}`} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Phone {review.phoneId}</CardTitle>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(review.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-right">{review.createdAt}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">{review.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image src="/placeholder.svg" alt={`User ${review.userId}`} fill className="object-cover" />
                    </div>
                    <span className="text-sm">User {review.userId}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/community/reviews/${review.id}`}>Read Full Review</Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}

