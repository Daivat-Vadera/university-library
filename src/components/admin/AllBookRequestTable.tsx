import React from "react";
import BookRequestTableRow from "./BookRequestTableRow";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";

const AllBookRequestTable = async() => {
  const bookRequests = (await db.select().from(borrowRecords)).sort((a, b) => {
    return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
  });
  
  return (
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
      {bookRequests.map((request) => {
        return <BookRequestTableRow key={request.id} {...request} />;
      })}
    </section>
  );
};

export default AllBookRequestTable;
