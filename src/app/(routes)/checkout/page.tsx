"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function page() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cartItems"));

    const createCheckOutSession = async () => {
      if (!products) {
        console.error("No products in the cart.");
        return;
      }
      try {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-stripe-session", {
          products,
        });
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        localStorage.removeItem("cartItems");
        localStorage.setItem("result", JSON.stringify(result));
        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error("Error creating checkout session:", error.message);
      }
    };
    createCheckOutSession();
  }, []);

  return <div>hello</div>;
}

export default page;
