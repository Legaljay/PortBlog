"use client";

import React, { useTransition } from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { checkout } from "@/lib/actions/stripe";
import { usePathname } from "next/navigation";
import LoginForm from "../nav/LoginForm";
import { useUserStore } from "@/lib/store/user";

// Initialize Stripe outside of the component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK_KEY!);

export default function Checkout() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const user = useUserStore((state) => state.user);

  const handleCheckOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      startTransition(async () => {
        const { sessionId } = await checkout(user.email, location.origin + pathname);
        const stripe = await stripePromise;

        if (!stripe) {
          throw new Error('Stripe failed to initialize');
        }

        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) {
          console.error('Stripe checkout error:', error);
        }
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96 gap-2">
        <LoginForm /> to continue
      </div>
    );
  }

  return (
    <form
      onSubmit={handleCheckOut}
      className={cn(
        "flex items-center w-full justify-center h-96",
        { hidden: !user?.id },
        { "animate-pulse": isPending }
      )}
    >
      <button
        className="ring-1 ring-green-500 p-10 rounded-md text-center"
        type="submit"
        disabled={isPending}
      >
        <h1 className="uppercase font-bold text-2xl text-green-500 flex items-center gap-2">
          <LightningBoltIcon
            className={cn(
              "w-5 h-5",
              !isPending ? "animate-bounce" : "animate-spin"
            )}
          />
          Upgrade to pro
        </h1>
        <p className="text-sm text-gray-500">
          Unlock all Daily blog contents
        </p>
      </button>
    </form>
  );
}