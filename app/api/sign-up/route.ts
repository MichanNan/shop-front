import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email) {
      return new NextResponse("Email is required!", { status: 500 });
    }

    if (!name) {
      return new NextResponse("Name is required!", { status: 500 });
    }

    if (!password) {
      return new NextResponse("Password is required!", { status: 500 });
    }

    const ExistedUser = await prismadb.client.findFirst({
      where: {
        email: email,
      },
    });

    if (ExistedUser?.id) {
      return new NextResponse("User already existed, please sign in!", {
        status: 500,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.client.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("REGISTER_ERROR", error);
  }
}
