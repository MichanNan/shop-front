import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
      return new NextResponse("Please login first!");
    }

    const user = await prismadb.client.findUnique({
      where: { email: session?.user?.email },
    });

    if (!user) {
      return new NextResponse("Please login first!");
    }

    const orders = await prismadb.order.findMany({
      where: { clientId: user.id },
      include: {
        orderItems: { include: { product: { include: { images: true } } } },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
