"use client";
import { useState } from "react";
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
import { deleteUser, updateUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
interface UserRowActionProps {
  userRole: "ADMIN" | "USER" | null;
  userId: string;
}
type Checked = DropdownMenuCheckboxItemProps["checked"];

const UserRowAction = ({ userRole, userId }: UserRowActionProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(userRole);
  const handlePositionChange = (value: string) => {
    setRole(value as "ADMIN" | "USER");
  };
  const handleDelete = async () => {
    const result = await deleteUser(userId!);
    if (result.success) {
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };
  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleSave = () => {
    try {
      const result = updateUserRole(userId, role!);
      toast({
        title: "Success",
        description: "User Role updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsEditable(false);
    }
  };
  return (
    <>
      <div className="py-4  w-1/12">
        {isEditable ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <span
                  className={`${role === "ADMIN" ? "bg-[#ECFDF3]" : "bg-[#FDF2FA]"} rounded-2xl px-3 py-1`}
                >
                  <span
                    className={`${role === "ADMIN" ? "text-[#027A48]" : "text-[#C11574]"} text-base font-medium leading-5 font-ibm-plex-sans`}
                  >
                    {role && role.toString().charAt(0).toUpperCase()}
                    {role && role.toString().toLowerCase().slice(1)}
                  </span>
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup
                value={role ?? undefined}
                onValueChange={handlePositionChange}
              >
                <DropdownMenuRadioItem value="ADMIN">
                  <span className={` bg-[#ECFDF3] rounded-2xl px-3 py-1`}>
                    <span
                      className={`text-[#027A48] text-base font-medium leading-5 font-ibm-plex-sans`}
                    >
                      {"ADMIN".toString().charAt(0).toUpperCase()}
                      {"ADMIN".toString().toLowerCase().slice(1)}
                    </span>
                  </span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="USER">
                  <span className={`bg-[#FDF2FA] rounded-2xl px-3 py-1`}>
                    <span
                      className={`text-[#C11574] text-base font-medium leading-5 font-ibm-plex-sans`}
                    >
                      {"USER".toString().charAt(0).toUpperCase()}
                      {"USER".toString().toLowerCase().slice(1)}
                    </span>
                  </span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span
            className={`${role === "ADMIN" ? "bg-[#ECFDF3]" : "bg-[#FDF2FA]"} rounded-2xl px-3 py-1`}
          >
            <span
              className={`${role === "ADMIN" ? "text-[#027A48]" : "text-[#C11574]"} text-base font-medium leading-5 font-ibm-plex-sans`}
            >
              {role && role.toString().charAt(0).toUpperCase()}
              {role && role.toString().toLowerCase().slice(1)}
            </span>
          </span>
        )}
      </div>
      <div className=" py-4 px-2 w-1/12">
        <div className="flex flex-row items-center gap-4">
          {isEditable ? (
            <div className="flex flex-row items-center">
              <div
                className="edit-button cursor-pointer mr-2"
                onClick={handleSave}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.69 22.7501C14.25 22.7501 13.79 22.6201 13.32 22.3701L9.39001 20.1801C9.20001 20.0801 8.78998 20.0801 8.59998 20.1801L4.67999 22.3701C3.82999 22.8401 2.95999 22.8801 2.29999 22.4901C1.62999 22.1001 1.25 21.3201 1.25 20.3601V9.00012C1.25 6.87012 2.97999 5.14014 5.10999 5.14014H12.89C15.02 5.14014 16.75 6.87012 16.75 9.00012V20.3601C16.75 21.3201 16.37 22.1001 15.7 22.4901C15.4 22.6601 15.06 22.7501 14.69 22.7501ZM9 18.6001C9.4 18.6001 9.79 18.6901 10.12 18.8701L14.05 21.0601C14.41 21.2601 14.74 21.3101 14.94 21.1901C15.13 21.0801 15.25 20.7601 15.25 20.3501V8.99011C15.25 7.69011 14.19 6.63013 12.89 6.63013H5.10999C3.80999 6.63013 2.75 7.69011 2.75 8.99011V20.3501C2.75 20.7601 2.87 21.0801 3.06 21.1901C3.25 21.3001 3.59001 21.2501 3.95001 21.0501L7.88 18.8601C8.20001 18.6901 8.6 18.6001 9 18.6001Z"
                    fill="#0089F1"
                  />
                  <path
                    d="M20.69 18.8698C20.25 18.8698 19.79 18.7397 19.32 18.4897L15.63 16.4297C15.39 16.2997 15.25 16.0498 15.25 15.7798V8.99976C15.25 7.69976 14.19 6.63977 12.89 6.63977H8C7.59 6.63977 7.25 6.29977 7.25 5.88977V5.11975C7.25 2.98975 8.97999 1.25977 11.11 1.25977H18.89C21.02 1.25977 22.75 2.98975 22.75 5.11975V16.4798C22.75 17.4398 22.37 18.2197 21.7 18.6097C21.4 18.7797 21.06 18.8698 20.69 18.8698ZM16.75 15.3297L20.05 17.1797C20.41 17.3797 20.74 17.4298 20.94 17.3098C21.13 17.1998 21.25 16.8798 21.25 16.4698V5.10974C21.25 3.80974 20.19 2.74976 18.89 2.74976H11.11C9.80999 2.74976 8.75 3.80974 8.75 5.10974V5.12976H12.89C15.02 5.12976 16.75 6.85975 16.75 8.98975V15.3297Z"
                    fill="#0089F1"
                  />
                  <path
                    d="M11 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H11C11.41 11.25 11.75 11.59 11.75 12C11.75 12.41 11.41 12.75 11 12.75Z"
                    fill="#0089F1"
                  />
                  <path
                    d="M9 14.75C8.59 14.75 8.25 14.41 8.25 14V10C8.25 9.59 8.59 9.25 9 9.25C9.41 9.25 9.75 9.59 9.75 10V14C9.75 14.41 9.41 14.75 9 14.75Z"
                    fill="#0089F1"
                  />
                </svg>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="delete-button cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9997 6.72998C20.9797 6.72998 20.9497 6.72998 20.9197 6.72998C15.6297 6.19998 10.3497 5.99998 5.11967 6.52998L3.07967 6.72998C2.65967 6.76998 2.28967 6.46998 2.24967 6.04998C2.20967 5.62998 2.50967 5.26998 2.91967 5.22998L4.95967 5.02998C10.2797 4.48998 15.6697 4.69998 21.0697 5.22998C21.4797 5.26998 21.7797 5.63998 21.7397 6.04998C21.7097 6.43998 21.3797 6.72998 20.9997 6.72998Z"
                        fill="#EF3A4B"
                      />
                      <path
                        d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25H13.3107C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76H10.7007C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z"
                        fill="#EF3A4B"
                      />
                      <path
                        d="M15.2104 22.7501H8.79039C5.30039 22.7501 5.16039 20.8201 5.05039 19.2601L4.40039 9.19007C4.37039 8.78007 4.69039 8.42008 5.10039 8.39008C5.52039 8.37008 5.87039 8.68008 5.90039 9.09008L6.55039 19.1601C6.66039 20.6801 6.70039 21.2501 8.79039 21.2501H15.2104C17.3104 21.2501 17.3504 20.6801 17.4504 19.1601L18.1004 9.09008C18.1304 8.68008 18.4904 8.37008 18.9004 8.39008C19.3104 8.42008 19.6304 8.77007 19.6004 9.19007L18.9504 19.2601C18.8404 20.8201 18.7004 22.7501 15.2104 22.7501Z"
                        fill="#EF3A4B"
                      />
                      <path
                        d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
                        fill="#EF3A4B"
                      />
                      <path
                        d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                        fill="#EF3A4B"
                      />
                    </svg>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      User from the Website.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="edit-button cursor-pointer" onClick={handleEdit}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.53999 19.5201C4.92999 19.5201 4.35999 19.31 3.94999 18.92C3.42999 18.43 3.17999 17.69 3.26999 16.89L3.63999 13.65C3.70999 13.04 4.07999 12.23 4.50999 11.79L12.72 3.10005C14.77 0.930049 16.91 0.870049 19.08 2.92005C21.25 4.97005 21.31 7.11005 19.26 9.28005L11.05 17.97C10.63 18.42 9.84999 18.84 9.23999 18.9401L6.01999 19.49C5.84999 19.5 5.69999 19.5201 5.53999 19.5201ZM15.93 2.91005C15.16 2.91005 14.49 3.39005 13.81 4.11005L5.59999 12.8101C5.39999 13.0201 5.16999 13.5201 5.12999 13.8101L4.75999 17.05C4.71999 17.38 4.79999 17.65 4.97999 17.82C5.15999 17.99 5.42999 18.05 5.75999 18L8.97999 17.4501C9.26999 17.4001 9.74999 17.14 9.94999 16.93L18.16 8.24005C19.4 6.92005 19.85 5.70005 18.04 4.00005C17.24 3.23005 16.55 2.91005 15.93 2.91005Z"
                  fill="#0089F1"
                />
                <path
                  d="M17.3404 10.9498C17.3204 10.9498 17.2904 10.9498 17.2704 10.9498C14.1504 10.6398 11.6404 8.26985 11.1604 5.16985C11.1004 4.75985 11.3804 4.37985 11.7904 4.30985C12.2004 4.24985 12.5804 4.52985 12.6504 4.93985C13.0304 7.35985 14.9904 9.21985 17.4304 9.45985C17.8404 9.49985 18.1404 9.86985 18.1004 10.2798C18.0504 10.6598 17.7204 10.9498 17.3404 10.9498Z"
                  fill="#0089F1"
                />
                <path
                  d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
                  fill="#0089F1"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserRowAction;
