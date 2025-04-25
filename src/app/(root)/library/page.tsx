import Pagination from "@/components/admin/Pagination";
import BookList from "@/components/BookList";
import Search from "@/components/Search";
import { getBooks } from "@/lib/admin/actions/book";
import React from "react";

const page = async ({ searchParams }: PageProps) => {
  const { query, sort, page } = await searchParams;
  const { data, metaData } = await getBooks({ query, sort, page, limit: 100 });
  console.log(data);
  
  return (
    <section>
      <div className='flex flex-col items-center'>
        <div className='max-w-xl text-center'>
          <p className='text-lg font-semibold text-light-100 uppercase'>
            Discover Your Next Great Read:
          </p>
          <h1 className='text-5xl font-bold text-light-100 mt-4'>
            Explore and Search for{" "}
            <span className='text-[#FFE1BD]'>Any Book</span> In Our Library
          </h1>
          <Search />
        </div>
      </div>
      <div className='mt-20'>
        <BookList books={data} title='All Library Books' />
      </div>
    </section>
  );
};

export default page;
