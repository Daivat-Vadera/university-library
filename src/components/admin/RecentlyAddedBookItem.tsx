import React from "react";
import BookCover from "../BookCover";
import Link from "next/link";
import { formatDate } from "@/utils/helper";
interface Props extends Book {
  createdAt: Date | null;
}
const RecentlyAddedBookItem = (props: Props) => {
  return (
    <Link href={`/admin/books/${props.id}`} className='flex flex-row items-start'>
      <div className=' py-4 px-2 w-2/12'>
        <div className='flex flex-row items-center justify-center'>
          <BookCover
            coverColor={props.bookPrimaryColor}
            coverImage={props.bookImage}
            className='max-w-14 h-20'
          />
        </div>
      </div>
      <div className=' py-4 px-2 w-10/12'>
        <div className=''>
          <div>
            <div>
              <h3 className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans '>
                {props.bookTitle}
              </h3>
            </div>
            <div className='flex gap-2 items-center text-sm text-[#64748B] leading-6'>
              <span>By {props.author}</span>
              <span>
                <svg
                  width='4'
                  height='5'
                  viewBox='0 0 4 5'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='2' cy='2.5' r='2' fill='#8C8E98' />
                </svg>
              </span>
              <span>{props.genre}</span>
            </div>
          </div>
          <div className='flex flex-row items-center mt-2 gap-3'>
            <div className='flex gap-2 items-center'>
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 2V5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M16 2V5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M3.5 9.08997H20.5'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z'
                    stroke='#8C8E98'
                    stroke-width='1.5'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.6947 13.7H15.7037'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M15.6947 16.7H15.7037'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M11.9955 13.7H12.0045'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M11.9955 16.7H12.0045'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M8.29431 13.7H8.30329'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M8.29431 16.7H8.30329'
                    stroke='#8C8E98'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </span>
              <span className='text-dark-400 text-sm leading-5 font-ibm-plex-sans'>
                {formatDate(new Date(props.createdAt!))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentlyAddedBookItem;
