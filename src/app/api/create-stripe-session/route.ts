import { NextRequest, NextResponse } from "next/server";
import stripe from "stripe";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { products } = body;
  console.log(products, "products---");
  if (!products) {
    throw new Error("Invalid products data.");
  }

  const stripeInst = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ecommerce-black-rho.vercel.app";

  const transformedProducts = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripeInst.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedProducts,
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: transformedProducts[0].price_data.product_data.images[0],
    },
  });
  console.log("session", session);
  return NextResponse.json({ id: session.id });
}
