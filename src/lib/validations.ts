import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  bookTitle: z.string().min(3).nonempty("Book Title is required"),
  description: z.string().min(10).nonempty("Description is required"),
  author: z.string().min(3).nonempty("Author is required"),
  genre: z.string().min(3).nonempty("Genre is required"),
  rating: z.coerce.number().min(1).max(5), // add this field
  totalNoOfBooks: z.coerce
    .number()
    .nonnegative("Total number of books is required"),
  availableCopies: z.coerce
    .number()
    .nonnegative("Available copies is required"), // add this field
  bookImage: z.string().nonempty("Book Image is required"),
  bookPrimaryColor: z
    .string()
    .trim()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
    .nonempty("Book Color is required"),
  bookVideo: z.string().nullable(),
  bookSummary: z.string().nonempty("Book Summary is required"),
});
