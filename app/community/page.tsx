"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Star,
  PenSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useToast } from "@/components/ui/use-toast";
import { TDiscussion, TReview } from "@/lib/db";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [discussions, setDiscussions] = useState<TDiscussion[]>([]);

  const [reviewList, setReviewList] = useState<TReview[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setReviewList(data);
    }
  };
  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    const response = await fetch("/api/discussions");
    if (response.ok) {
      const data = await response.json();
      setDiscussions(data);
    }
  };
  const user = useAuth();
  const { toast } = useToast();

  const handleNewPost = (type: "discussion" | "review") => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: `Please sign in to create a new ${type}.`,
        variant: "destructive",
      });
    } else {
      // Navigate to the new post page
      window.location.href = `/community/${type}s/new`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Phone Finder Community
          </h1>
          <p className="text-muted-foreground">
            Join discussions, share experiences, and connect with other phone
            enthusiasts
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <p className="text-2xl font-bold">12,450+</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-8 w-8 mb-2 text-primary" />
              <p className="text-2xl font-bold">45,280+</p>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Star className="h-8 w-8 mb-2 text-primary" />
              <p className="text-2xl font-bold">32,150+</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Community Tabs */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Latest Discussions</h2>
            </div>

            <div className="grid gap-6">
              {discussions.map((discussion) => (
                <Card key={discussion._id}>
                  <CardHeader>
                    <Link href={`/community/discussions/${discussion._id}`}>
                      <CardTitle className="text-xl hover:text-primary transition-colors">
                        {discussion.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-2">
                      <div className="relative h-6 w-6 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg"
                          alt="User Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>User {discussion.userId}</span>
                      <span>•</span>
                      <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {discussion.content.slice(0, 150)}...
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {discussion.replyCount} replies
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/community/discussions/${discussion._id}`}>
                        Read More
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">
                <Link href='community/discussions'>Load More Discussions</Link>
              </Button>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Latest Reviews</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {reviewList.map((review) => (
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
                              Phone {review.phoneId}
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
                              <span className="ml-2 text-sm">
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <CardDescription className="text-right">
                            {new Date(review.createdAt as Date).toDateString()}
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
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/community/reviews/${review._id}`}>
                            Read Full Review
                          </Link>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline"><Link href='/community/reviews'>Load More Reviews</Link></Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Guidelines */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Be respectful and considerate of other members</li>
              <li>Provide honest and constructive feedback</li>
              <li>Do not post spam or promotional content</li>
              <li>Respect intellectual property and copyright</li>
              <li>Follow our terms of service and privacy policy</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/community/guidelines">Read Full Guidelines</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
