import { UserCircle, Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-xl font-bold text-[#2E7D32]">
        FoodWise
      </h1>

      {/* Right Icons */}
      <div className="flex items-center gap-5 text-[#333333]">
        <Search className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <UserCircle className="cursor-pointer" size={28} />
      </div>
    </nav>
  );
}
