import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { prisma } from "@/lib/prisma";
import { reservationProps } from "@/types/reservation";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export const POST = async (request: Request) => {
  try {
    const reservation: reservationProps = await request.json();

    const payment = await prisma.payment.findUnique({
      where: { reservationId: reservation.id },
    });

    if (payment && payment.status !== "paid" && payment.token) {
      return NextResponse.json({ token: payment.token });
    }

    const parameter = {
      transaction_details: {
        order_id: reservation.id,
        gross_amount: reservation.Payment?.amount || 0,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: reservation.User.name,
        email: reservation.User.email,
      },
    };

    const token = await snap.createTransactionToken(parameter);

    await prisma.payment.update({
      where: { reservationId: reservation.id },
      data: { token, status: "pending" },
    });

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
};
