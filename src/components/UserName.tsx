"use client";
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/redux/store";

export const UserName = () => {
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <Badge className="text-sm font-normal bg-[var(--primary-400)] text-white border-none">
      Olá, {userInfo.name}
    </Badge>
  )
}