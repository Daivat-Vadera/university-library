import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";
import AccountRequestItem from "./AccountRequestItem";

const AccountRequests = async () => {
  const allUnapprovedUsers = (
    await db.select().from(users).where(eq(users.status, "PENDING")).limit(6)
  ).sort((a, b) => {
    return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
  });
  return (
    <div className='bg-white rounded-2xl py-5 px-4'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>Account Requests</h2>
        <Link
          href='/admin/account-requests'
          className='bg-light-300 rounded-md py-2 px-4'
        >
          <span className='text-primary-admin font-medium'>View All</span>
        </Link>
      </div>
      <div className='barrow-requests-wrapper flex flex-row flex-wrap gap-2 mt-3'>
        {allUnapprovedUsers.map((user) => {
          return <AccountRequestItem key={user.id} {...user} />;
        })}
      </div>
    </div>
  );
};

export default AccountRequests;
