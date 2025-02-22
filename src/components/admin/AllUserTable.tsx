import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import React from "react";
import UserTableRow from "./UserTableRow";

const AllUserTable = async () => {
  const allUsers = await db.select().from(users);
  console.log(allUsers);
  
  return (
    <section>
      <div className="bg-light-300 flex flex-row">
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-3/12">
          Name
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          Date Joined
        </div>

        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          Books Borrowed
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          University ID No
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-2/12">
          University ID Card
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12">
          Role
        </div>
        <div className="text-base font-normal text-dark-200 leading-5 font-ibm-plex-sans py-4 px-2 w-1/12">
          Action
        </div>
      </div>
      {allUsers.map((user) => {
        return <UserTableRow key={user.id} {...user} />;
      })}
    </section>
  );
};

export default AllUserTable;
