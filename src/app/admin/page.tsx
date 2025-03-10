import AccountRequests from "@/components/admin/AccountRequests";
import BorrowRequests from "@/components/admin/BorrowRequests";
import RecentlyAddedBooks from "@/components/admin/RecentlyAddedBooks";
import React from "react";

const Page = () => {
  return (
    <div className='flex flex-row gap-3'>
      <div className='w-1/2 gap-4 flex flex-col'>
        <BorrowRequests />
        <AccountRequests />
      </div>
      <div className='w-1/2'>
        <RecentlyAddedBooks />
      </div>
    </div>
  );
};

export default Page;
