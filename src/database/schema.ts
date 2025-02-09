import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "APPROVED",
  "PENDING",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  lastActivityDate: date("last_activity_date").defaultNow(),
});


export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  bookTitle: varchar("book_title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  bookImage: text("cover_url").notNull(),
  bookPrimaryColor: varchar("book_primary_color",{ length: 7 }).notNull(),
  description: text("description").notNull(),
  totalNoOfBooks: integer("total_no_of_books").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  bookVideo: text("video_url").notNull(),
  bookSummary: text("book_summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});