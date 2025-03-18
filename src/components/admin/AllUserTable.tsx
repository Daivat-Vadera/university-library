import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import React from "react";
import UserTableRow from "./UserTableRow";
import Pagination from "./Pagination";
import { getUsers } from "@/lib/admin/actions/user";

const AllUserTable = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const allUsers = await getUsers({ page });

  return (
    <>
      <section>
        <div className='bg-light-300 flex flex-row'>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-3/12'>
            Name
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Date Joined
          </div>

          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            Books Borrowed
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            University ID No
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12'>
            University ID Card
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12'>
            Role
          </div>
          <div className='text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12'>
            Action
          </div>
        </div>
        {allUsers.data.map((user: User) => {
          return <UserTableRow key={user.id} {...user} />;
        })}
      </section>
      <div className='mt-5 w-full flex flex-row justify-end gap-3'>
        <Pagination hasNextPage={allUsers.metaData?.hasNextPage!} />
      </div>
    </>
  );
};

export default AllUserTable;
