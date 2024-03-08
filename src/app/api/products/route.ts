import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// get all products
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchQuery = searchParams.get("searchQuery"); // nullable
    const category = searchParams.get("category");      // nullable
    const limit = parseInt(searchParams.get("limit")); // nullable
    let products;
    
    // Create the where clause based on searchQuery and category
    const whereClause: any = {};
    if (searchQuery) {
      whereClause.name = { contains: searchQuery };
    }
    if (category) {
      whereClause.category = { equals: category };
    }

    // Modify the database query based on the presence of the limit parameter
    if (limit && !isNaN(limit) && limit > 0) {
      products = await db.product.findMany({
        where: whereClause,
        take: limit,
      });
    } else {
      products = await db.product.findMany({
        where: whereClause,
      });
    }
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
