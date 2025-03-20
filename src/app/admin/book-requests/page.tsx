import AllBookRequestTable from "@/components/admin/AllBookRequestTable";
import SortingOptions from "@/components/admin/SortingOptions";
import React from "react";

const page = async ({ searchParams, params }: PageProps) => {
  const { sort } = await searchParams;
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
      <div className='flex flex-row items-center justify-between gap-2'>
        <h2 className='font-semibold text-xl'>Borrow Book Requests</h2>
        <SortingOptions
          dropdownValues={["Newest to Oldest", "Oldest to Newest"]}
          sort={sort}
        />
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <AllBookRequestTable searchParams={searchParams} params={params} />
      </div>
    </section>
  );
};

export default page;
