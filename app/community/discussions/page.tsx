"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TDiscussion } from "@/lib/db";
import { toast } from "react-toastify";

export default function DiscussionsPage() {
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });
    const [discussions, setDiscussions] = useState<TDiscussion[]>([]);
  const user = true;

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
  const handleNewDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDiscussionItem = {
      userId: "12",
      title: newDiscussion.title,
      content: newDiscussion.content,
      tags: [],
      createdAt: new Date().toISOString(),
      replyCount: 0,
    };

    const response = await fetch("/api/discussions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscussionItem),
    });
    if (!response.ok) {
      throw new Error("Failed to save phone data");
    }

    const data = await response.json();
    setNewDiscussion({ title: "", content: "" });

    toast.success("Discussion created.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discussions</h1>

      {user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Start a New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewDiscussion} className="space-y-4">
              <Input
                placeholder="Discussion Title"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={newDiscussion.content}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    content: e.target.value,
                  })
                }
                required
              />
              <Button type="submit">Post Discussion</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {discussions.length > 0 && discussions.map((discussion) => (
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
                <span>{new Date(discussion.createdAt as Date).toLocaleDateString()}</span>
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

      <div className="flex justify-center mt-8">
        {/* <Button variant="outline">Load More Discussions</Button> */}
      </div>
    </div>
  );
}
