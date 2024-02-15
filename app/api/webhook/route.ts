import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error:${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const name = session?.customer_details?.name;

  const orderId = session.metadata?.orderId;

  const order = await prismadb.order.findUnique({
    where: {
      id: orderId,
    },
    include: { orderItems: true },
  });

  if (!order) {
    return new NextResponse("Something went wrong!");
  }

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        name: name as string,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    await Promise.all(
      order.orderItems.map(async (item) => {
        const product = await prismadb.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          return new NextResponse("Product not found!");
        }

        const updatedAmount = product.amount - item.amount;

        const updatedProduct = await prismadb.product.update({
          where: { id: item.productId },
          data: {
            amount: updatedAmount,
            isArchived: updatedAmount === 0 ? true : product.isArchived,
          },
        });

        return NextResponse.json(updatedProduct);
      })
    );
  }

  return new NextResponse(null, { status: 200 });
}
