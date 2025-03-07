"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { updateBookRequest } from "@/lib/admin/actions/bookrequest";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface BookRequestRowStatusProps {
  status: "BORROWED" | "RETURNED" | "OVERDUE" | null;
  id: string;
}
const BookRequestRowStatus = ({ status, id }: BookRequestRowStatusProps) => {
  const [borrowedStatus, setBorrowedStatus] = useState<
    "BORROWED" | "RETURNED" | "OVERDUE" | null
  >(status);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handlePositionChange = async (value: string) => {
    setOpen(false);
    try {
      toast({
        title: "Updating status",
        description: "Please wait...",
        variant: "default",
      });
      const result = await updateBookRequest(
        id,
        value as "BORROWED" | "RETURNED" | "OVERDUE"
      );
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setBorrowedStatus(value as "BORROWED" | "RETURNED" | "OVERDUE");
        router.refresh(); // This refreshes the parent server component
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
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    if (status === "RETURNED" || status === "OVERDUE") {
      setOpen(true);
    }
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={open}>
          <div className={`${open ? "" : "cursor-pointer"}`}>
            <span
              className={`${borrowedStatus === "BORROWED" && "bg-[#F9F5FF]"} ${borrowedStatus === "RETURNED" && "bg-[#F0F9FF]"} ${borrowedStatus === "OVERDUE" && "bg-[#FFF1F3]"} rounded-2xl px-3 py-1`}
            >
              <span
                className={`${borrowedStatus === "BORROWED" && "text-[#6941C6]"} ${borrowedStatus === "RETURNED" && "text-[#026AA2]"} ${borrowedStatus === "OVERDUE" && "text-[#C01048]"} text-base font-medium leading-5 font-ibm-plex-sans`}
              >
                {borrowedStatus &&
                  borrowedStatus.toString().charAt(0).toUpperCase()}
                {borrowedStatus &&
                  borrowedStatus.toString().toLowerCase().slice(1)}
              </span>
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40'>
          <DropdownMenuRadioGroup
            value={borrowedStatus ?? undefined}
            onValueChange={handlePositionChange}
          >
            <DropdownMenuRadioItem value='BORROWED'>
              <span className={` bg-[#F9F5FF] rounded-2xl px-3 py-1`}>
                <span
                  className={`text-[#6941C6] text-base font-medium leading-5 font-ibm-plex-sans`}
                >
                  {"BORROWED".toString().charAt(0).toUpperCase()}
                  {"BORROWED".toString().toLowerCase().slice(1)}
                </span>
              </span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='RETURNED'>
              <span className={`bg-[#F0F9FF] rounded-2xl px-3 py-1`}>
                <span
                  className={`text-[#026AA2] text-base font-medium leading-5 font-ibm-plex-sans`}
                >
                  {"RETURNED".toString().charAt(0).toUpperCase()}
                  {"RETURNED".toString().toLowerCase().slice(1)}
                </span>
              </span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='OVERDUE'>
              <span className={`bg-[#FFF1F3] rounded-2xl px-3 py-1`}>
                <span
                  className={`text-[#C01048] text-base font-medium leading-5 font-ibm-plex-sans`}
                >
                  {"OVERDUE".toString().charAt(0).toUpperCase()}
                  {"OVERDUE".toString().toLowerCase().slice(1)}
                </span>
              </span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BookRequestRowStatus;
