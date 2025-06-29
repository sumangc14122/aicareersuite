import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import type Stripe from "stripe";
// import { Buffer } from "micro";
import prisma from "@/lib/prisma";

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.arrayBuffer(); // 👈 Works in Edge runtimes
  const buf = Buffer.from(rawBody);
  // const buf = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 },
    );
  }

  // Only handle subscription completed
  if (event.type === "checkout.session.completed") {
    // const session = event.data.object as Stripe.Checkout.Session;
    // const customerId = session.customer as string;
    // const clerkUserId = session.customer_metadata?.clerkUserId;

    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const clerkUserId = session.metadata?.clerkUserId;

    if (clerkUserId) {
      // mark profile.isPro = true
      await prisma.profile.upsert({
        where: { userId: clerkUserId },
        update: {
          stripeCustomerId: customerId,
          isPro: true,
        },
        create: {
          userId: clerkUserId,
          name: "(unknown)", // you can fill defaults
          stripeCustomerId: customerId,
          isPro: true,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
