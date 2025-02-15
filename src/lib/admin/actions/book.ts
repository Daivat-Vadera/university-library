"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        bookVideo: params.bookVideo ?? "",
        availableCopies: params.totalNoOfBooks,
      })
      .returning();
    return {
      success: true,
      message: "Book created successfully",
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
export const updateBook = async (
  params: BookParams,
  id: string | undefined
) => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        bookVideo: params.bookVideo ?? "", // Ensure bookVideo is not null
      })
      .where(eq(books.id, id!))
      .returning();
    return {
      success: true,
      message: "Book created successfully",
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Updating the book",
    };
  }
};
