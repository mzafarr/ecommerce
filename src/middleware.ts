import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./lib/auth";
import { cookies } from "next/headers";
import axios from "axios";

export async function middleware(request: NextRequest) {
  // const URL = "http://localhost:3000";

  // const cookieStore = cookies();
  // const token = cookieStore.get("token").value;

  // if (!token) {
  //   return NextResponse.redirect(`${URL}/signin`);
  // }

  //   const userId = await getSession(token) as string;
  //   cookieStore.set('userId', userId);
    return NextResponse.next();
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.redirect(`${URL}/signin`);
  // }
}

export const config = {
  matcher: ["/api/cart/:path*", "/api/profile", "/api/cart/checkout"],
};
