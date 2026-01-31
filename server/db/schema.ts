import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Better Auth tables
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// App Master Data
export const brands = sqliteTable("brands", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// Cars table
export const cars = sqliteTable("cars", {
  id: text("id").primaryKey(),
  brandId: text("brand_id")
    .notNull()
    .references(() => brands.id, { onDelete: "cascade" }),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  price: integer("price").notNull(),
  mileage: integer("mileage").notNull(),
  transmission: text("transmission", { enum: ["Manual", "Automatic"] }).notNull(),
  fuel: text("fuel", { enum: ["Bensin", "Diesel", "Hybrid", "Electric"] }).notNull(),
  color: text("color").notNull(),
  region: text("region").notNull(), // Plat wilayah
  description: text("description"),
  status: text("status", { enum: ["Available", "Sold"] }).notNull().default("Available"),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Car Images table
export const carImages = sqliteTable("car_images", {
  id: text("id").primaryKey(),
  carId: text("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  isMain: integer("is_main", { mode: "boolean" }).default(false),
});

// Relations
export const carRelations = relations(cars, ({ one, many }) => ({
  brand: one(brands, {
    fields: [cars.brandId],
    references: [brands.id],
  }),
  images: many(carImages),
}));

export const brandRelations = relations(brands, ({ many }) => ({
  cars: many(cars),
}));

export const carImageRelations = relations(carImages, ({ one }) => ({
  car: one(cars, {
    fields: [carImages.carId],
    references: [cars.id],
  }),
}));

// Showroom Settings
export const settings = sqliteTable("settings", {
  id: text("id").primaryKey(),
  showroomName: text("showroom_name").notNull().default("Showroom Mobil Bekas"),
  address: text("address"),
  phone: text("phone"), // WhatsApp
  email: text("email"),
  googleMaps: text("google_maps"),
  slogan: text("slogan"),
  about: text("about"),
  vision: text("vision"),
  mission: text("mission"),
});
