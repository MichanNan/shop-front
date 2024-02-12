import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { Product } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, clientEmail } = body;
    const client = await prismadb.client.findFirst({
      where: { email: clientEmail },
    });

    if (items.length === 0) {
      return new NextResponse("Shopping cart muss not be empty!");
    }

    const productIds = items.map(
      (item: { product: Product; amount: number }) => item.product.id
    );

    const amounts = items.map(
      (item: { product: Product; amount: number }) => item.amount
    );

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      const amount = items.find(
        (item: { product: Product; amount: number }) =>
          item.product.id === product.id
      ).amount;
      line_items.push({
        quantity: amount,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: parseInt(product.price) * 100,
        },
      });
    });

    if (client?.id) {
      const order = await prismadb.order.create({
        data: {
          isPaid: false,
          clientId: client?.id,
          orderItems: {
            create: productIds.map((productId: string, index: number) => ({
              product: {
                connect: {
                  id: productId,
                },
              },
              amount: amounts[index],
            })),
          },
        },
        include: { orderItems: true },
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata: {
          orderId: order.id,
        },
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.log("CHECKOUT_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
