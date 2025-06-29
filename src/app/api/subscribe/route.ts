import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1) Lookup or create Stripe Customer
  // (you could persist customerId in Profile here; webhook also sets it)
  const customer = await stripe.customers.create({
    metadata: { clerkUserId: user.id },
  });

  // 2) Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customer.id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.id}?subscribed=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.id}?subscribed=false`,
  });

  return NextResponse.json({ url: session.url });
}
