import AllBookRequestTable from "@/components/admin/AllBookRequestTable";
import React from "react";

const page = async ({ searchParams, params }: PageProps) => {
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
      <div className='flex flex-row items-center justify-between gap-2'>
        <h2 className='font-semibold text-xl'>Borrow Book Requests</h2>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <AllBookRequestTable searchParams={searchParams} params={params} />
      </div>
    </section>
  );
};

export default page;
