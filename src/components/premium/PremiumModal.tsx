"use client";

import { useToast } from "@/hooks/use-toast";
import usePremiumModal from "@/hooks/usePremiumModal";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createCheckoutSession } from "./actions";

const premiumFeatures = [
  "Create & download resumes",
  "Limited to 2 resumes",
  "ATS-friendly",
  "PDF download",
];
const premiumPlusFeatures = [
  "Everything in Basic",
  "Infinite resumes",
  "Design customizations",
  "AI-Powered Resume Builder",
  "Priority support",
];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      // console.log("Creating checkout session for price:", priceId); // Debug log
      const redirectUrl = await createCheckoutSession(priceId);

      if (!redirectUrl) {
        throw new Error("No redirect URL received");
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        description:
          "Something went wrong with the subscription. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Land your dream job with Resume Builder AI
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-center">
          <p>
            Unlock powerful AI features to create standout resumes that get you
            noticed.
          </p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Basic</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                  )
                }
                disabled={loading}
              >
                {loading ? "Processing..." : "Only $9.99/month"}
              </Button>
            </div>
            <div className="mx-6 border-l" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-center text-lg font-bold text-transparent">
                Premium
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant="premium"
                onClick={() =>
                  handlePremiumClick(
                    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                  )
                }
                disabled={loading}
              >
                {loading ? "Processing..." : "Only $19.99/month"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
