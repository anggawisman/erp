import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the expected request body type for creating a new contact
interface ContactRequestBody {
  name: string;
  email: string;
  type: string[];
  website: string;
  phone: string;
}

// GET method for fetching all contacts
export async function GET(): Promise<Response> {
  try {
    const contacts = await prisma.contact.findMany();
    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch contacts",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST method for adding a new contact
export async function POST(req: Request): Promise<Response> {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, type, website, phone } = body;

    const newContact = await prisma.contact.create({
      data: { name, email, type, website, phone },
    });

    return new Response(JSON.stringify(newContact), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to add contact",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
