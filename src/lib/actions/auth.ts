"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq, Placeholder, SQL } from "drizzle-orm";
import { signIn } from "../../../auth";

export const signInWithCredentials = async (
  prams: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = prams;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error, "Signin error");
    return {
      success: false,
      error: "Signin error",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 1) {
    return {
      success: false,
      error: "Usee already exists",
    };
  }
  const hashedPassword = await hash(password.toString(), 12);
  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });
    await signInWithCredentials({ email, password });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error, "Signup error");
    return {
      success: false,
      error: "Signup error",
    };
  }
};
