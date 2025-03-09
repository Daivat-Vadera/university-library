import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";
import AccountRequestTableRow from "./AccountRequestTableRow";

const AccountRequestTable = async () => {
  const allUnapprovedUsers = await db
    .select()
    .from(users)
    .where(eq(users.status , "PENDING"));
    
  return (
    <section>
      <div className='bg-light-300 flex flex-row'>
        <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-4/12'>
          Name
        </div>
        <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
          Date Joined
        </div>
        <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
          University ID No
        </div>
        <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
          University ID Card
        </div>
        <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-3/12'>
          Action
        </div>
      </div>
      {allUnapprovedUsers.map((user) => {
        return <AccountRequestTableRow key={user.id} {...user} />;
      })}
    </section>
  );
};

export default AccountRequestTable;
