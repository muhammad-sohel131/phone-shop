import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TDiscussion } from "@/lib/db";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function DiscussionCard({ discussion }: { discussion: TDiscussion }) {
  return (
    <Card>
      <CardHeader>
        <Link href={`/community/discussions/${discussion._id}`}>
          <CardTitle className="text-xl hover:text-primary transition-colors">
            {discussion.title}
          </CardTitle>
        </Link>
        <CardDescription className="flex items-center gap-2">
          <span>User {discussion.userId}</span>
          <span>•</span>
          <span>
            {new Date(discussion.createdAt as Date).toLocaleDateString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {discussion.content.length > 150
            ? `${discussion.content.slice(0, 150)}...`
            : discussion.content}
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
  );
}