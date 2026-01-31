import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { brands } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function GET() {
  const allBrands = await db.select().from(brands).orderBy(brands.name);
  return NextResponse.json(allBrands);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const [newBrand] = await db
    .insert(brands)
    .values({ id: nanoid(), name })
    .returning();

  return NextResponse.json(newBrand);
}
