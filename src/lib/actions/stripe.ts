"use server";
 
import Stripe from "stripe";

if (!process.env.STRIPE_SK_KEY) {
  throw new Error("Missing STRIPE_SK_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SK_KEY);

export async function checkout(email: string, redirectTo: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: redirectTo || process.env.SITE_URL,
      cancel_url: process.env.SITE_URL,
      customer_email: email,
      line_items: [{ price: process.env.PRO_PRICE_ID, quantity: 1 }],
      mode: "subscription",
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    throw error;
  }
}

export async function manageBillingPortal(customer_id: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: process.env.SITE_URL,
    });
    return { url: session.url };
  } catch (error) {
    console.error('Billing portal error:', error);
    throw error;
  }
}