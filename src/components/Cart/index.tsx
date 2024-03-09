"use client";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { numberWithCommas } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  //@ts-ignore
  // const state = useSelector((state) => state.user);
  // const [cartItems, setCartItems] = useState(state.cartItems);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  async function checkout() {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);

    const createCheckOutSession = async () => {
      if (!cartItems) {
        console.error("No cartItems in the cart.");
        return;
      }
      try {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-stripe-session", {
          cartItems,
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
    await createCheckOutSession();
  }

  useEffect(() => {
    async function getCartItems() {
      const res = await axios.get("/api/cart");
      setCartItems(res.data.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(res.data.cartItems));
    }
    console.log(`localStorage.getItem("cartItems")`, localStorage.getItem("cartItems"))
    // if (state.cartItems.length === 0) {
    if (
      localStorage.getItem("cartItems") === null &&
      !localStorage.getItem("token") 
    ) {
      getCartItems();
    } else {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
    }
    let newTotalAmount = 0, n = cartItems?.length || 0;
    for (let i = 0; i < n; i++) {
      newTotalAmount += cartItems[i]?.price * cartItems[i]?.quantity;
    }
    setTotalAmount(newTotalAmount);
  }, []);

  const fee = 1;
  const itemCount = cartItems?.length || 0;
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-300"
        />
        <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-300">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-xs">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full h-full flex-col pr-6">
              <ScrollArea className="h-[64vh]">
                {cartItems.map((cartItem) => (
                  <CartItem cartItem={cartItem} key={cartItem.id} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>$ {numberWithCommas(totalAmount)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <button
                    onClick={checkout}
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </button>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            {/*  <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              /> 
            </div>*/}
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
