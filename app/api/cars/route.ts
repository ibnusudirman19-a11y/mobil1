import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { cars, carImages } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, and, gte, lte, or, desc, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get("brandId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const transmission = searchParams.get("transmission");
  const fuel = searchParams.get("fuel");
  const sort = searchParams.get("sort") || "newest";
  const featured = searchParams.get("featured");

  const conditions = [];
  if (brandId) conditions.push(eq(cars.brandId, brandId));
  if (minPrice) conditions.push(gte(cars.price, parseInt(minPrice)));
  if (maxPrice) conditions.push(lte(cars.price, parseInt(maxPrice)));
  if (transmission) conditions.push(eq(cars.transmission, transmission as any));
  if (fuel) conditions.push(eq(cars.fuel, fuel as any));
  if (featured === "true") conditions.push(eq(cars.isFeatured, true));

  let orderBy = desc(cars.createdAt);
  if (sort === "price_asc") orderBy = asc(cars.price);
  if (sort === "price_desc") orderBy = desc(cars.price);
  if (sort === "year_desc") orderBy = desc(cars.year);

  const results = await db.query.cars.findMany({
    where: conditions.length > 0 ? and(...conditions) : undefined,
    with: {
      brand: true,
      images: true,
    },
    orderBy,
  });

  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const carId = nanoid();

  const [newCar] = await db
    .insert(cars)
    .values({
      id: carId,
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
      status: "Available",
      isFeatured: body.isFeatured || false,
    })
    .returning();

  if (body.images && body.images.length > 0) {
    await db.insert(carImages).values(
      body.images.map((img: string, idx: number) => ({
        id: nanoid(),
        carId: carId,
        url: img,
        isMain: idx === 0,
      }))
    );
  }

  return NextResponse.json(newCar);
}
