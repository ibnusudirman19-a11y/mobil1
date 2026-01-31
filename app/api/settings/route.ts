import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { settings } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET() {
  const result = await db.select().from(settings).limit(1);
  return NextResponse.json(result[0] || null);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const existing = await db.select().from(settings).limit(1);

  if (existing.length > 0) {
    const [updated] = await db
      .update(settings)
      .set(body)
      .where(eq(settings.id, existing[0].id))
      .returning();
    return NextResponse.json(updated);
  } else {
    const [created] = await db
      .insert(settings)
      .values({
        id: nanoid(),
        ...body,
      })
      .returning();
    return NextResponse.json(created);
  }
}

import { eq } from "drizzle-orm";
