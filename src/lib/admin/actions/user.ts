"use server";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { count, desc, eq } from "drizzle-orm";

const ITEMS_PER_PAGE = 10;

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

export const getUsers = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
}: QueryParams) => {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);
    const totalItems = await db.select({ count: count(users.id) }).from(users);
    const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;
    return {
      success: true,
      message: "Users fetched successfully",
      data: JSON.parse(JSON.stringify(allUsers)),
      metaData: {
        totalPages: totalPages,
        hasNextPage: hasNextPage,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching users",
    };
  }
};

export const unApprovedUsers = async ({ page = 1, limit = ITEMS_PER_PAGE }) => {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .where(eq(users.status, "PENDING"))
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);
    const totalItems = await db
      .select({ count: count(users.id) })
      .from(users)
      .where(eq(users.status, "PENDING"));
    const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;
    return {
      success: true,
      message: "Users fetched successfully",
      data: JSON.parse(JSON.stringify(allUsers)),
      metaData: {
        totalPages: totalPages,
        hasNextPage: hasNextPage,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching users",
    };
  }
};
