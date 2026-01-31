import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { brands } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(brands).where(eq(brands.id, id));

  return NextResponse.json({ success: true });
}
