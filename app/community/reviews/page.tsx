"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { TReview } from "@/lib/db";

export default function ReviewsPage() {
  const [reviewList, setReviewList] = useState<TReview[]>([]);

    useEffect(() => {
      fetchReviews()
    }, [])
  
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews")
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setReviewList(data)
      }
    }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Reviews</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {reviewList?.map((review) => (
          <Card key={review._id}>
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/3 h-[200px] md:h-auto">
                <Image
                  src="/placeholder.svg"
                  alt={`Phone ${review.phoneId}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                       {review.phoneId}
                      </CardTitle>
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
                    <CardDescription className="text-right">
                      {new Date(review.createdAt as Date).toLocaleString()}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {review.content}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg"
                        alt={`User ${review.userId}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">User {review.userId}</span>
                  </div>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Reviews</Button>
      </div> */}
    </div>
  );
}
