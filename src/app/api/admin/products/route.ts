import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all products
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchQuery = searchParams.get("searchQuery"); // nullable
    const category = searchParams.get("category"); // nullable

    let products;
    if (searchQuery && category) {
      products = await db.product.findMany({
        where: {
          name: {
            contains: searchQuery,
          },
          category: {
            equals: category,
          },
        },
      });
    } else if (category) {
      products = await db.product.findMany({
        where: {
          category: {
            equals: category,
          },
        },
      });
    } else if (searchQuery) {
      products = await db.product.findMany({
        where: {
          name: {
            contains: searchQuery,
          },
        },
      });
    } else {
      products = await db.product.findMany();
    }
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
