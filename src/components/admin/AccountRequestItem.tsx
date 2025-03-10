import { getInitials } from "@/lib/utils";
import { formatDate } from "@/utils/helper";
import { Link } from "lucide-react";
import { config } from "@/lib/config";
import { Avatar, AvatarFallback } from "../ui/avatar";

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
const AccountRequestItem = (user: Props) => {
  return (
    <div className='py-[14px] px-8 bg-light-300 rounded-md max-w-fit'>
      <div className='user flex flex-col items-center justify-center'>
        <Avatar>
          <AvatarFallback>{getInitials(user.fullName || "IN")}</AvatarFallback>
        </Avatar>
        <div className='text-center'>
          <p className='font-semibold text-dark-200'>{user.fullName}</p>
          <p className='text-xs text-light-500 overflow-hidden max-w-[120px] text-ellipsis'>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountRequestItem;
