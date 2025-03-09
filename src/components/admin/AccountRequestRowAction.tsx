"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { updateUserStatus } from "@/lib/admin/actions/user";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
}
const AccountRequestRowAction = (props: Props) => {
  const router = useRouter();
  const handleApprove = async (status: "APPROVED" | "PENDING" | "REJECTED") => {
    try {
      const result = await updateUserStatus(props.id, status);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className='flex flex-row items-center'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className='bg-green-100 py-2 px-4 rounded-lg text-green-800 font-semibold mr-5 cursor-pointer'>
            Approve Account
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className=''>
          <AlertDialogHeader className='text-center sm:text-center'>
            <AlertDialogTitle asChild>
              <>
                <span className='mx-auto'>
                  <svg
                    width='110'
                    height='110'
                    viewBox='0 0 110 110'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.1'
                      cx='55'
                      cy='55'
                      r='55'
                      fill='#4C7B62'
                    />
                    <circle cx='55' cy='55' r='40' fill='#4C7B62' />
                    <path
                      d='M55 68.4375C47.5875 68.4375 41.5625 62.4125 41.5625 55C41.5625 47.5875 47.5875 41.5625 55 41.5625C62.4125 41.5625 68.4375 47.5875 68.4375 55C68.4375 62.4125 62.4125 68.4375 55 68.4375ZM55 43.4375C48.625 43.4375 43.4375 48.625 43.4375 55C43.4375 61.375 48.625 66.5625 55 66.5625C61.375 66.5625 66.5625 61.375 66.5625 55C66.5625 48.625 61.375 43.4375 55 43.4375Z'
                      fill='white'
                    />
                    <path
                      d='M53.2258 59.4745C52.9758 59.4745 52.7383 59.3745 52.5633 59.1995L49.0258 55.662C48.6633 55.2995 48.6633 54.6995 49.0258 54.337C49.3883 53.9745 49.9883 53.9745 50.3508 54.337L53.2258 57.212L59.6508 50.787C60.0133 50.4245 60.6133 50.4245 60.9758 50.787C61.3383 51.1495 61.3383 51.7495 60.9758 52.112L53.8883 59.1995C53.7133 59.3745 53.4758 59.4745 53.2258 59.4745Z'
                      fill='white'
                    />
                  </svg>
                </span>
                <AlertDialogCancel asChild>
                  <span className='outline-none border-none shadow-none cursor-pointer hover:bg-transparent hover:outline-none hover:border-none hover:shadow-none absolute top-2 right-2'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z'
                        fill='#3A354E'
                      />
                    </svg>
                  </span>
                </AlertDialogCancel>
              </>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <>
                <h3 className='font-semibold text-xl !mt-6'>
                  Approve Account Request
                </h3>
                <p className='text-[#64748B] !mt-3'>
                  Approve the student’s account request and grant access. A
                  confirmation email will be sent upon approval.
                </p>
              </>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='justify-center sm:justify-center w-full mt-3'>
            <AlertDialogAction
              onClick={() => handleApprove("APPROVED")}
              className='w-full bg-green-400 text-light-800 font-bold py-4 h-14 rounded-xl hover:bg-green-900'
            >
              Approve & Send Confirmation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className='cursor-pointer'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z'
                fill='#EF3A4B'
              />
              <path
                d='M9.16937 15.5801C8.97937 15.5801 8.78938 15.5101 8.63938 15.3601C8.34938 15.0701 8.34938 14.5901 8.63938 14.3001L14.2994 8.64011C14.5894 8.35011 15.0694 8.35011 15.3594 8.64011C15.6494 8.93011 15.6494 9.41011 15.3594 9.70011L9.69937 15.3601C9.55937 15.5101 9.35937 15.5801 9.16937 15.5801Z'
                fill='#EF3A4B'
              />
              <path
                d='M14.8294 15.5801C14.6394 15.5801 14.4494 15.5101 14.2994 15.3601L8.63938 9.70011C8.34938 9.41011 8.34938 8.93011 8.63938 8.64011C8.92937 8.35011 9.40937 8.35011 9.69937 8.64011L15.3594 14.3001C15.6494 14.5901 15.6494 15.0701 15.3594 15.3601C15.2094 15.5101 15.0194 15.5801 14.8294 15.5801Z'
                fill='#EF3A4B'
              />
            </svg>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className=''>
          <AlertDialogHeader className='text-center sm:text-center'>
            <AlertDialogTitle asChild>
              <>
                <span className='mx-auto'>
                  <svg
                    width='110'
                    height='110'
                    viewBox='0 0 110 110'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.1'
                      cx='55'
                      cy='55'
                      r='55'
                      fill='#F46F70'
                    />
                    <circle cx='55' cy='55' r='40' fill='#F46F70' />
                    <path
                      d='M55.5 68.4375C48.0875 68.4375 42.0625 62.4125 42.0625 55C42.0625 47.5875 48.0875 41.5625 55.5 41.5625C62.9125 41.5625 68.9375 47.5875 68.9375 55C68.9375 62.4125 62.9125 68.4375 55.5 68.4375ZM55.5 43.4375C49.125 43.4375 43.9375 48.625 43.9375 55C43.9375 61.375 49.125 66.5625 55.5 66.5625C61.875 66.5625 67.0625 61.375 67.0625 55C67.0625 48.625 61.875 43.4375 55.5 43.4375Z'
                      fill='white'
                    />
                    <path
                      d='M55.5 57.1875C54.9875 57.1875 54.5625 56.7625 54.5625 56.25V50C54.5625 49.4875 54.9875 49.0625 55.5 49.0625C56.0125 49.0625 56.4375 49.4875 56.4375 50V56.25C56.4375 56.7625 56.0125 57.1875 55.5 57.1875Z'
                      fill='white'
                    />
                    <path
                      d='M55.5 61.2501C55.3375 61.2501 55.175 61.2126 55.025 61.1501C54.875 61.0876 54.7375 61.0001 54.6125 60.8876C54.5 60.7626 54.4125 60.6376 54.35 60.4751C54.2875 60.3251 54.25 60.1626 54.25 60.0001C54.25 59.8376 54.2875 59.6751 54.35 59.5251C54.4125 59.3751 54.5 59.2376 54.6125 59.1126C54.7375 59.0001 54.875 58.9126 55.025 58.8501C55.325 58.7251 55.675 58.7251 55.975 58.8501C56.125 58.9126 56.2625 59.0001 56.3875 59.1126C56.5 59.2376 56.5875 59.3751 56.65 59.5251C56.7125 59.6751 56.75 59.8376 56.75 60.0001C56.75 60.1626 56.7125 60.3251 56.65 60.4751C56.5875 60.6376 56.5 60.7626 56.3875 60.8876C56.2625 61.0001 56.125 61.0876 55.975 61.1501C55.825 61.2126 55.6625 61.2501 55.5 61.2501Z'
                      fill='white'
                    />
                  </svg>
                </span>
                <AlertDialogCancel asChild>
                  <span className='outline-none border-none shadow-none cursor-pointer hover:bg-transparent hover:outline-none hover:border-none hover:shadow-none absolute top-2 right-2'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M19.281 18.2193C19.3507 18.289 19.406 18.3717 19.4437 18.4628C19.4814 18.5538 19.5008 18.6514 19.5008 18.7499C19.5008 18.8485 19.4814 18.9461 19.4437 19.0371C19.406 19.1281 19.3507 19.2109 19.281 19.2806C19.2114 19.3502 19.1286 19.4055 19.0376 19.4432C18.9465 19.4809 18.849 19.5003 18.7504 19.5003C18.6519 19.5003 18.5543 19.4809 18.4632 19.4432C18.3722 19.4055 18.2895 19.3502 18.2198 19.2806L12.0004 13.0602L5.78104 19.2806C5.64031 19.4213 5.44944 19.5003 5.25042 19.5003C5.05139 19.5003 4.86052 19.4213 4.71979 19.2806C4.57906 19.1398 4.5 18.949 4.5 18.7499C4.5 18.5509 4.57906 18.36 4.71979 18.2193L10.9401 11.9999L4.71979 5.78055C4.57906 5.63982 4.5 5.44895 4.5 5.24993C4.5 5.05091 4.57906 4.86003 4.71979 4.7193C4.86052 4.57857 5.05139 4.49951 5.25042 4.49951C5.44944 4.49951 5.64031 4.57857 5.78104 4.7193L12.0004 10.9396L18.2198 4.7193C18.3605 4.57857 18.5514 4.49951 18.7504 4.49951C18.9494 4.49951 19.1403 4.57857 19.281 4.7193C19.4218 4.86003 19.5008 5.05091 19.5008 5.24993C19.5008 5.44895 19.4218 5.63982 19.281 5.78055L13.0607 11.9999L19.281 18.2193Z'
                        fill='#3A354E'
                      />
                    </svg>
                  </span>
                </AlertDialogCancel>
              </>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <>
                <h3 className='font-semibold text-xl !mt-6'>
                  Deny Account Request
                </h3>
                <p className='text-[#64748B] !mt-3'>
                  Denying this request will notify the student they’re not
                  eligible due to unsuccessful ID card verification.
                </p>
              </>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='justify-center sm:justify-center w-full mt-3'>
            <AlertDialogAction
              onClick={() => handleApprove("REJECTED")}
              className='w-full bg-red-400 text-light-800 font-bold py-4 h-14 rounded-xl hover:bg-red-900'
            >
              Deny & Notify Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountRequestRowAction;
