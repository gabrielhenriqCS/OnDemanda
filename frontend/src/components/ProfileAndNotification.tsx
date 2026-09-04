import { Bell, UserRound } from "lucide-react";

export default function ProfileAndNotification() {
  return (
    <div className="flex items-center gap-4">
      <Bell className="cursor-pointer"/>
      <div className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center cursor-pointer">
        <UserRound/>
      </div>
    </div>
  );
}
