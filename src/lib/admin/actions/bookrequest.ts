"use server";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { count, eq } from "drizzle-orm";
const ITEMS_PER_PAGE = 10;
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

export const bookRequests = async ({ page = 1, limit = ITEMS_PER_PAGE }) => {
  try {
    const bookRequests = (
      await db
        .select()
        .from(borrowRecords)
        .limit(limit)
        .offset((page - 1) * limit)
    ).sort((a, b) => {
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    });
    const totalItems = await db
      .select({ count: count(borrowRecords.id) })
      .from(borrowRecords);
    const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;
    return {
      success: true,
      message: "Book requests fetched successfully",
      data: JSON.parse(JSON.stringify(bookRequests)),
      metaData: {
        totalPages: totalPages,
        hasNextPage: hasNextPage,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Getting the book requests",
    };
  }
};
