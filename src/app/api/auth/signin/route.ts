import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log('user:', user);
    console.log('password:', password)
    console.log('user.password:', user.password)
    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    // Create a JWT token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token);

    // res.cookies.set("token", token, {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 1000, // 1 day
    //   path: "/",
    // });
    const response = NextResponse.json(
      { user, token }, //token in actual shouldnt be here 
      { status: 200, statusText: "Set cookie successfully" }
    );

    response.cookies.set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
    });

    return response;
    // return NextResponse.json(
    //   { user },
    //   {
    //     status: 200,
    //     headers: {
    //       "Set-Cookie": `token=${token}; sameSite=strict; httpOnly=true; maxAge=60*60*24`,
    //     },
    //   }
    // );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
