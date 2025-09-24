import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Shield,
  Users,
  MessageSquare,
  Star,
  ThumbsUp,
} from "lucide-react";

export default function CommunityGuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Community Guidelines</CardTitle>
          <CardDescription>
            Our community guidelines are designed to create a safe, respectful,
            and productive environment for all members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              General Principles
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>Be respectful and considerate of others</li>
              <li>No hate speech, discrimination, or harassment</li>
              <li>Keep discussions constructive and on-topic</li>
              <li>Protect your privacy and respect others' privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6" />
              User Conduct
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>Use appropriate language and maintain a professional tone</li>
              <li>Avoid spamming or excessive self-promotion</li>
              <li>Do not impersonate others or create multiple accounts</li>
              <li>Report inappropriate content to moderators</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Discussions
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>Stay on topic and contribute meaningfully to discussions</li>
              <li>Avoid duplicate posts and check existing discussions</li>
              <li>Use clear, descriptive titles for your posts</li>
              <li>Respect others' opinions and engage in civil debate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="h-6 w-6" />
              Reviews
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                Write honest and unbiased reviews based on personal experience
              </li>
              <li>Include both pros and cons in your reviews</li>
              <li>Do not post fake or misleading reviews</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Content Moderation
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>
                Moderators may remove content that violates these guidelines
              </li>
              <li>Repeated violations may result in account suspension</li>
              <li>Appeals can be made through the contact form</li>
              <li>
                Guidelines are subject to change with notice to the community
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ThumbsUp className="h-6 w-6" />
              Best Practices
            </h2>
            <ul className="space-y-4 list-disc pl-6">
              <li>Use proper formatting for better readability</li>
              <li>Include relevant details in your posts</li>
              <li>Be patient with new members</li>
              <li>Help maintain a positive community atmosphere</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
