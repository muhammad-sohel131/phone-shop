"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TDiscussion, TReply } from "@/lib/db";

export default function DiscussionDetails() {
  const params = useParams();
  const discussionId = params?.id as string;

  const [discussion, setDiscussion] = useState<TDiscussion | null>(null);
  const [replies, setReplies] = useState<TReply[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch discussion by ID
  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const res = await fetch(
          `/api/discussions?discussionId=${discussionId}`
        );
        const data = await res.json();
        setDiscussion(data);
      } catch (err) {
        console.error("Error fetching discussion", err);
      }
    }
    async function fetchReplies() {
      try {
        const res = await fetch(`/api/replies?discussionId=${discussionId}`);
        console.log(res);
        const data = await res.json();
        setReplies(data);
      } catch (err) {
        console.error("Error fetching discussion", err);
      }
    }
    if (discussionId) {
      fetchDiscussion(), fetchReplies();
    }
  }, [discussionId]);

  // Submit reply
  async function handleReplySubmit() {
    if (!reply.trim()) return;
    setLoading(true);

    try {
      await fetch(`/api/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reply, discussionId, userId: "68d2e5b0a0e18c52c6100ab6" }),
      });

      setReply("");
    } catch (err) {
      console.error("Error submitting reply", err);
    } finally {
      setLoading(false);
    }
  }

  if (!discussion) {
    return <p className="text-center mt-10">Loading discussion...</p>;
  }

  console.log(replies);

  return (
    <div className="container mx-auto mt-10 space-y-6">
      {/* Discussion Details */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{discussion.title}</h2>
          <p className="text-sm text-gray-500">
            By User {discussion.userId} •{" "}
            {new Date(discussion.createdAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="mb-2">{discussion.content}</p>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        {replies?.length > 0 ? (
          replies.map((rep) => (
            <Card key={rep._id}>
              <CardContent className="flex gap-3 items-start p-4">
                <Avatar>
                  <AvatarFallback>{rep.userId}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{rep.userId}</p>
                  <p className="text-sm text-gray-700">{rep.content}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(rep.createdAt as Date).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No replies yet.</p>
        )}
      </div>

      {/* Reply Form */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Textarea
            placeholder="Write your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button onClick={handleReplySubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Reply"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
