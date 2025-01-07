import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ GET /api/classification
export async function GET(): Promise<Response> {
  try {
    const classifications = await prisma.classification.findMany({
      include: { subclassifications: true },
    });
    return new Response(JSON.stringify(classifications), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching classifications:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch classifications' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// ✅ POST /api/classification
export async function POST(req: Request): Promise<Response> {
  try {
    const { name, description } = await req.json();

    const newClassification = await prisma.classification.create({
      data: { name, description },
    });

    return new Response(JSON.stringify(newClassification), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating classification:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create classification' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
