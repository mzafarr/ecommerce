import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, category, imageList, quantity } = body;
    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        category,
        images: {
          create: imageList.map((image: string) => ({
            url: image,
          })),
        },
      },
    });
    return NextResponse.json({ product: newProduct }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// get one product using id
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const product = await db.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, price, category, imageList, quantity } =
      body;
    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        quantity,
        category,
        images: {
          deleteMany: {},
          create: imageList.map((image: string) => ({
            url: image,
          })),
        },
      },
    });
    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ product: deletedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
