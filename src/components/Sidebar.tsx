import { useState } from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState<string>("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineHome />, path: "/dashboard" },
    { name: "Users", icon: <AiOutlineUser />, path: "/dashboard/users" },
    {
      name: "Settings",
      icon: <AiOutlineSetting />,
      path: "/dashboard/settings",
    },
    { name: "Logout", icon: <FiLogOut />, path: "/" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        My Dashboard
      </div>
      <div className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 ${
                active === item.name ? "bg-gray-700" : ""
              }`}
            >
              <Link href={item.path}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
