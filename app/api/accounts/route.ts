import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// ✅ Type for the PATCH request body
interface AccountUpdateRequestBody {
  id: number;
  name?: string;
  accountNumber?: string;
  type?: string;
  currencyId?: number;
  subclassificationId?: number;
  balance?: number;
}

// ✅ GET method for fetching all accounts
export async function GET(): Promise<Response> {
  try {
    const accounts = await prisma.account.findMany({
      include: { currency: true, subclassification: true },
    });
    return new Response(JSON.stringify(accounts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch accounts', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// ✅ POST method for adding a new account
export async function POST(req: Request): Promise<Response> {
  try {
    const { name, accountNumber, type, currencyId, subclassificationId, balance } =
      await req.json();

    const newAccount = await prisma.account.create({
      data: {
        name,
        accountNumber,
        type,
        currencyId,
        subclassificationId,
        balance: balance || 0.0,
      },
    });

    return new Response(JSON.stringify(newAccount), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add account', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// ✅ PATCH method for updating an existing account
export async function PATCH(req: Request): Promise<Response> {
  try {
    // Parse and validate the request body
    const body: AccountUpdateRequestBody = await req.json();

    if (!body.id) {
      return new Response(
        JSON.stringify({ error: 'Account ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the account with the provided fields
    const updatedAccount = await prisma.account.update({
      where: { id: body.id },
      data: {
        name: body.name,
        accountNumber: body.accountNumber,
        type: body.type,
        currencyId: body.currencyId,
        subclassificationId: body.subclassificationId,
        balance: body.balance,
      },
    });

    return new Response(JSON.stringify(updatedAccount), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating account:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update account', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
