import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ GET /api/subclassification
export async function GET(): Promise<Response> {
  try {
    const subclassifications = await prisma.subclassification.findMany({
      include: { classification: true },
    });
    return new Response(JSON.stringify(subclassifications), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching subclassifications:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch subclassifications' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// ✅ POST /api/subclassification
export async function POST(req: Request): Promise<Response> {
  try {
    const { name, description, classificationId } = await req.json();

    const newSubclassification = await prisma.subclassification.create({
      data: { name, description, classificationId },
    });

    return new Response(JSON.stringify(newSubclassification), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating subclassification:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create subclassification' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
