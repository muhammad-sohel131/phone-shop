"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { discussions } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"

export default function DiscussionsPage() {
  const [discussionList, setDiscussionList] = useState(discussions)
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" })
  const { user } = useAuth()
  const { toast } = useToast()

  const handleNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a new discussion.",
        variant: "destructive",
      })
      return
    }

    const newDiscussionItem = {
      id: discussionList.length + 1,
      userId: user.id,
      title: newDiscussion.title,
      content: newDiscussion.content,
      tags: [],
      createdAt: new Date().toISOString(),
      viewCount: 0,
      replyCount: 0,
    }

    setDiscussionList([newDiscussionItem, ...discussionList])
    setNewDiscussion({ title: "", content: "" })

    toast({
      title: "Discussion created",
      description: "Your new discussion has been posted successfully.",
    })
  }

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
                onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="What's on your mind?"
                value={newDiscussion.content}
                onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                required
              />
              <Button type="submit">Post Discussion</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {discussionList.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader>
              <Link href={`/community/discussions/${discussion.id}`}>
                <CardTitle className="text-xl hover:text-primary transition-colors">{discussion.title}</CardTitle>
              </Link>
              <CardDescription className="flex items-center gap-2">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg" alt="User Avatar" fill className="object-cover" />
                </div>
                <span>User {discussion.userId}</span>
                <span>•</span>
                <span>{discussion.createdAt}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{discussion.content.slice(0, 150)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {discussion.replyCount} replies
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {discussion.viewCount} views
                </span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/community/discussions/${discussion.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Discussions</Button>
      </div>
    </div>
  )
}

