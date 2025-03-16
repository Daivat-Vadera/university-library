import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import Link from "next/link";
import React from "react";
import BorrowRequestItem from "./BorrowRequestItem";

const BorrowRequests = async () => {
  const barrowRequests = (await db.select().from(borrowRecords).limit(3)).sort(
    (a, b) => {
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    }
  );
  return (
    <div className='bg-white rounded-2xl py-5 px-4'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>Barrow Requests</h2>
        <Link
          href='/admin/book-requests'
          className='bg-light-300 rounded-md py-2 px-4'
        >
          <span className='text-primary-admin font-medium'>View All</span>
        </Link>
      </div>
      <div className='barrow-requests-wrapper flex flex-col gap-3 mt-3'>
        {barrowRequests.map((request) => {
          return <BorrowRequestItem key={request.id} {...request} />;
        })}
      </div>
    </div>
  );
};

export default BorrowRequests;
