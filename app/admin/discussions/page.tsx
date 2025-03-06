"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Discussion } from "@/types/discussion"

export default function AdminDiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchDiscussions()
  }, [])

  const fetchDiscussions = async () => {
    const response = await fetch("/api/discussions")
    if (response.ok) {
      const data = await response.json()
      setDiscussions(data)
    }
  }

  const handleDeleteDiscussion = async (discussionId: number) => {
    const response = await fetch(`/api/discussions?id=${discussionId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      fetchDiscussions()
      toast({
        title: "Discussion deleted",
        description: "The discussion has been successfully deleted.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete discussion. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discussion Management</CardTitle>
        <CardDescription>Manage user discussions and threads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{discussion.title}</p>
                <p className="text-sm text-muted-foreground">By User {discussion.userId}</p>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {discussion.replyCount} replies
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteDiscussion(discussion.id)}>
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

