import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
      return new NextResponse("Please login first!");
    }

    const user = await prismadb.client.findUnique({
      where: { email: session?.user?.email },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
