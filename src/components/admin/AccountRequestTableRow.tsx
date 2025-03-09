import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { config } from "@/lib/config";
import Link from "next/link";
import { formatDate } from "@/utils/helper";
import AccountRequestRowAction from "./AccountRequestRowAction";

interface Props {
  id: string;
  createdAt: Date | null;
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
  status: "APPROVED" | "PENDING" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  lastActivityDate: string | null;
}

const AccountRequestTableRow = (user: Props) => {
  return (
    <div className='flex flex-row items-center border-b border-light-300'>
      <div className=' py-4 px-2 w-4/12'>
        <div className='user flex flex-row items-center'>
          <Avatar>
            <AvatarFallback>
              {getInitials(user.fullName || "IN")}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col max-md:hidden pl-2'>
            <p className='font-semibold text-dark-200'>{user.fullName}</p>
            <p className='text-xs text-light-500'>{user.email}</p>
          </div>
        </div>
      </div>
      <div className='py-4 px-2 w-2/12'>
        <h4 className='text-dark-400 text-base font-semibold leading-5 font-ibm-plex-sans'>
          {formatDate(user.createdAt)}
        </h4>
      </div>
      <div className='py-4 px-2 w-2/12 font-semibold'>{user.universityId}</div>
      <div className=' py-4 px-2 w-2/12'>
        <Link
          href={config.env.imageKit.urlEndpoint + user.universityCard}
          className='flex flex-row items-center'
          target='_blank'
        >
          <span className='text-blue-100 font-semibold'>View ID Card</span>
          <span className='ml-2'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.9995 11.75C12.8095 11.75 12.6195 11.68 12.4695 11.53C12.1795 11.24 12.1795 10.76 12.4695 10.47L20.6695 2.26999C20.9595 1.97999 21.4395 1.97999 21.7295 2.26999C22.0195 2.55999 22.0195 3.03999 21.7295 3.32999L13.5295 11.53C13.3795 11.68 13.1895 11.75 12.9995 11.75Z'
                fill='#0089F1'
              />
              <path
                d='M21.9992 7.55C21.5892 7.55 21.2492 7.21 21.2492 6.8V2.75H17.1992C16.7892 2.75 16.4492 2.41 16.4492 2C16.4492 1.59 16.7892 1.25 17.1992 1.25H21.9992C22.4092 1.25 22.7492 1.59 22.7492 2V6.8C22.7492 7.21 22.4092 7.55 21.9992 7.55Z'
                fill='#0089F1'
              />
              <path
                d='M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z'
                fill='#0089F1'
              />
            </svg>
          </span>
        </Link>
      </div>
      <div className=' py-4 px-2 w-3/12'>
        <AccountRequestRowAction id={user.id} />
      </div>
    </div>
  );
};

export default AccountRequestTableRow;
