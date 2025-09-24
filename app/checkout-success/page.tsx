import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been placed
            successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Order #:{" "}
            <span className="font-medium">
              ORD-{Math.floor(Math.random() * 10000)}
            </span>
          </p>
          <p>
            We've sent a confirmation email with all the details of your
            purchase.
          </p>
          <p>Your items will be shipped within 1-3 business days.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/orders">View My Orders</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
