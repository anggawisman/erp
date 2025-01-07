// app/api/currencies/create/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  const { code, name, symbol, exchangeRate } = await req.json();

  try {
    const currency = await prisma.currency.create({
      data: {
        code,
        name,
        symbol,
        exchangeRate,
      },
    });
    return NextResponse.json(currency, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating currency" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const currencies = await prisma.currency.findMany();
    return NextResponse.json(currencies);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching currencies" },
      { status: 500 }
    );
  }
}
