"use server";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (id: string | undefined) => {
  try {
    const borrowedBook = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, id!));
    if (borrowedBook.length > 0) {
      return {
        success: false,
        message:
          "User has borrowed a book. Please Collect the book first And then delete the user.",
      };
    } else {
      const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id!))
        .returning();
      return {
        success: true,
        message: "User deleted successfully",
        data: JSON.parse(JSON.stringify(deletedUser[0])),
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Deleting the user",
    };
  }
};

export const updateUserRole = async (
  id: string | undefined,
  role: "USER" | "ADMIN"
) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id!))
      .returning();
    return {
      success: true,
      message: "User role updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser[0])),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Updating the user role",
    };
  }
};

export const updateUserStatus = async (
  id: string,
  status: "APPROVED" | "PENDING" | "REJECTED"
) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, id))
      .returning();
    return {
      success: true,
      message: "User status updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser[0])),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while Updating the user status",
    };
  }
};
