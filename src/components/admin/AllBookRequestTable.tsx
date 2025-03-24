import React from "react";
import BookRequestTableRow from "./BookRequestTableRow";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import Pagination from "./Pagination";
import { bookRequests } from "@/lib/admin/actions/bookrequest";

const AllBookRequestTable = async ({ searchParams }: PageProps) => {
  const { page, sort } = await searchParams;
  const allBookRequests = await bookRequests({ page, sort });
  return (
    <>
      <section>
        <div className='bg-light-300 flex flex-row rounded-t-xl'>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-3/12'>
            Book
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-3/12'>
            User Requested
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Borrowed status
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Borrowed date
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Return date
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Due Date
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Receipt
          </div>
        </div>
        {allBookRequests.data.map(
          (request: {
            id: string;
            status: "BORROWED" | "RETURNED" | "OVERDUE" | null;
            createdAt: Date | null;
            userId: string;
            bookId: string;
            borrowDate: Date;
            dueDate: string;
            returnDate: string | null;
          }) => {
            return (
              <BookRequestTableRow key={request.id} {...request} />
            );
          }
        )}
      </section>
      <div className='mt-5 w-full flex flex-row justify-end gap-3'>
        <Pagination hasNextPage={allBookRequests.metaData?.hasNextPage!} />
      </div>
    </>
  );
};

export default AllBookRequestTable;
