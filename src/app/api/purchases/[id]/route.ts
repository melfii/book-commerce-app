import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
    request: NextRequest,
    context: { params: { id: string } }) {

        const { id } = await context.params;

        try {
            const purchases = await prisma.purchase.findMany({
                where: {
                    userId: id
                }
            })

            return NextResponse.json(purchases);
        } catch(error) {
            return NextResponse.json(error);
        }

}