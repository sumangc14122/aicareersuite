"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "@/components/premium/actions";

export default function SubscribeButton({
  priceId,
  variant = "default",
}: {
  priceId: string;
  variant?: "default" | "premium";
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="w-full"
      variant={variant}
      onClick={handleClick}
      disabled={loading}
    >
      Get Started
    </Button>
  );
}
