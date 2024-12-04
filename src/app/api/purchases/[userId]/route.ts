import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
  ) {
    const { userId } = params;
  
    try {
      // 購入履歴の取得
      const purchases = await prisma.purchase.findMany({
        where: {
          userId: userId,
        },
      });
  
      return NextResponse.json(purchases);
    } catch (error) {
      // エラーのログを記録
      console.error("Error fetching purchases:", error);
  
      // クライアントに汎用エラーメッセージを返す
      return NextResponse.json(
        { message: "Failed to fetch purchase history" },
        { status: 500 }
      );
    }
  }