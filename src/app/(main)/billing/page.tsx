import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import SubscribeButton from "./SubscribeButton";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Billing & Subscription
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Current Plan</h2>
              <p className="text-sm text-muted-foreground">
                You are currently on the{" "}
                <span className="font-semibold text-primary">
                  {priceInfo
                    ? (priceInfo.product as Stripe.Product).name
                    : "Free"}
                </span>{" "}
                plan
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {priceInfo ? `$${priceInfo.unit_amount! / 100}` : "$0"}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
            </div>
          </div>

          {subscription?.stripeCancelAtPeriodEnd && (
            <div className="rounded-md bg-destructive/10 p-4">
              <p className="text-sm text-destructive">
                Your subscription will be canceled on{" "}
                {formatDate(
                  subscription.stripeCurrentPeriodEnd,
                  "MMMM dd, yyyy",
                )}
              </p>
            </div>
          )}

          {/* Billing Period Info */}
          {subscription && (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Current period ends on{" "}
                {formatDate(
                  subscription.stripeCurrentPeriodEnd,
                  "MMMM dd, yyyy",
                )}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            {subscription ? (
              <ManageSubscriptionButton />
            ) : (
              <GetSubscriptionButton />
            )}
          </div>
        </div>
      </div>

      {/* Plan Comparison Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 text-xl font-medium">Basic</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Create & download resumes</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Limited to 2 resumes</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>ATS-friendly</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>PDF download</span>
            </li>
          </ul>
          <p className="mt-4 text-2xl font-bold">
            $9.99
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </p>
          {!subscription && (
            <div className="mt-6">
              <SubscribeButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!}
              />
            </div>
          )}
        </div>

        <div className="relative rounded-lg border bg-card p-6">
          <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
            Popular
          </div>
          <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-xl font-medium text-transparent">
            Premium
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Everything in Basic</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Infinite resumes</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Design customizations</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>AI-Powered Resume Builder</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Priority support</span>
            </li>
          </ul>
          <p className="mt-4 text-2xl font-bold">
            $19.99
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </p>
          {!subscription && (
            <div className="mt-6">
              <SubscribeButton
                priceId={
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!
                }
                variant="premium"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
