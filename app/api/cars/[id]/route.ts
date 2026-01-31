import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { cars, carImages } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const car = await db.query.cars.findFirst({
    where: eq(cars.id, id),
    with: {
      brand: true,
      images: true,
    },
  });

  if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });

  return NextResponse.json(car);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const [updatedCar] = await db
    .update(cars)
    .set({
      brandId: body.brandId,
      model: body.model,
      year: parseInt(body.year),
      price: parseInt(body.price),
      mileage: parseInt(body.mileage),
      transmission: body.transmission,
      fuel: body.fuel,
      color: body.color,
      region: body.region,
      description: body.description,
      status: body.status,
      isFeatured: body.isFeatured,
      updatedAt: new Date(),
    })
    .where(eq(cars.id, id))
    .returning();

  // Simple image update logic: replace all images
  if (body.images) {
    await db.delete(carImages).where(eq(carImages.carId, id));
    if (body.images.length > 0) {
      await db.insert(carImages).values(
        body.images.map((img: string, idx: number) => ({
          id: nanoid(),
          carId: id,
          url: img,
          isMain: idx === 0,
        }))
      );
    }
  }

  return NextResponse.json(updatedCar);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(cars).where(eq(cars.id, id));

  return NextResponse.json({ success: true });
}
