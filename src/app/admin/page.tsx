import ErrorFallback from "@/components/admin/ErrorFallback";
import AccountRequests from "@/components/admin/home/AccountRequests";
import BorrowRequests from "@/components/admin/home/BorrowRequests";
import RecentlyAddedBooks from "@/components/admin/home/RecentlyAddedBooks";
import Statistics from "@/components/admin/home/Statistics";
import Loading from "@/components/admin/Loading";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Statistics />
        </Suspense>
      </ErrorBoundary>
      <div className='flex flex-row gap-3 mt-5'>
        <div className='w-1/2 gap-4 flex flex-col'>
          <BorrowRequests />
          <AccountRequests />
        </div>
        <div className='w-1/2'>
          <RecentlyAddedBooks />
        </div>
      </div>
    </>
  );
};

export default Page;
