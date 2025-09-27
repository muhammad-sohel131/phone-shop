"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TDiscussion } from "@/lib/db";
import { toast } from "sonner";
import DiscussionCard from "@/components/modules/community/DiscussionCard";
import { useAuth } from "@/context/auth-context";

export default function DiscussionsPage() {
  const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
  const [discussions, setDiscussions] = useState<TDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const user = useAuth()

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/discussions");
      if (res.ok) {
        const data = await res.json();
        setDiscussions(data);
      }
    } catch (err) {
      toast.error("Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  const handleNewDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;

    setSubmitting(true);
    try {
      const newDiscussionItem = {
        userId: "12",
        title: newDiscussion.title,
        content: newDiscussion.content,
        tags: [],
        createdAt: new Date().toISOString(),
        replyCount: 0,
      };

      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDiscussionItem),
      });

      if (!res.ok) throw new Error("Failed to save discussion");

      toast.success("Discussion created.");
      setNewDiscussion({ title: "", content: "" });
      fetchDiscussions(); 
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
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
              <Button type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post Discussion"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {loading ? (
          <p className="text-muted-foreground">Loading discussions...</p>
        ) : discussions.length === 0 ? (
          <p className="text-muted-foreground">No discussions yet.</p>
        ) : (
          discussions.map((d) => <DiscussionCard key={d._id} discussion={d} />)
        )}
      </div>
    </div>
  );
}