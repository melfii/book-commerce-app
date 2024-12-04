import { NextResponse } from "next/server";
import Stripe from "stripe";

let stripe: Stripe;

if(process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
}

export async function POST(request: Request) {

    const { title, price, bookId, userId } = await request.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            metadata: {
                bookId: bookId
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: title
                        },
                        unit_amount: price
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: process.env.NEXTAUTH_URL
        })

        return NextResponse.json({ checkout_url: session.url });
    } catch(error: unknown) {
        return NextResponse.json(error);
    }
}