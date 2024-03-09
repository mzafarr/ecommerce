import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(`${URL}/signin`);
    }
    const userId = (await getSession(token)) as string;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cartItems = await db.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            images: {
              take: 1,
            },
          },
        },
      },
    });
    console.log("cartItems", cartItems);
    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, newQuantity } = body;
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    // console.log("productId", productId, "quantity", quantity, "token", token);

    if (!token) {
      return NextResponse.redirect(`${URL}/signin`);
    }

    const userId = (await getSession(token)) as string;

    // console.log("userId", userId);
    // console.log("productId", productId);
    // console.log("newQuantity", newQuantity);

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // check if the product is already in the cart, if so update the quantity
    const cartItem = await db.cartItem.findFirst({
      where: {
        productId,
        userId,
      },
    });
    // if newQuantity is 0 then remove the product from the cart
    if (newQuantity === 0) {
      if (cartItem) {
        await db.cartItem.delete({
          where: {
            id: cartItem.id,
          },
        });
      }
      return NextResponse.json(
        { message: "Removed from cart" },
        { status: 200 }
      );
    }
    // if the product is in the cart, update the quantity
    else if (cartItem) {
      await db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    }
    // if the product is not in the cart, add it
    else {
      await db.cartItem.create({
        data: {
          quantity: newQuantity,
          product: {
            connect: {
              id: productId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return NextResponse.json({ message: "Added to cart" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
