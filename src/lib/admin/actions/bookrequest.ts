"use server";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

export const updateBookRequest = async (
  id: string,
  status: "BORROWED" | "RETURNED" | "OVERDUE"
) => {
  try {
    const updatedBookRequest = await db
      .update(borrowRecords)
      .set({ status: status, returnDate: new Date().toISOString() })
      .where(eq(borrowRecords.id, id))
      .returning();

    return {
      success: true,
      message: "Borrow request status updated successfully",
      data: JSON.parse(JSON.stringify(updatedBookRequest[0])),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Updating the book request status",
    };
  }
};
