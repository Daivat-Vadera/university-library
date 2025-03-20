import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";
import AccountRequestTableRow from "./AccountRequestTableRow";
import Pagination from "./Pagination";
import { unApprovedUsers } from "@/lib/admin/actions/user";

const AccountRequestTable = async ({ searchParams }: PageProps) => {
  const { page, sort } = await searchParams;
  const allUnapprovedUsers = await unApprovedUsers({ page, sort });

  return (
    <>
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
        {allUnapprovedUsers.data.map((user: User) => {
          return <AccountRequestTableRow key={user.id} {...user} />;
        })}
      </section>
      <div className='mt-5 w-full flex flex-row justify-end gap-3'>
        <Pagination hasNextPage={allUnapprovedUsers.metaData?.hasNextPage!} />
      </div>
    </>
  );
};

export default AccountRequestTable;
