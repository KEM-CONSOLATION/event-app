"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
  const [active, setActive] = useState<string>("Events");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const menuItems = [
    { name: "Events", icon: <AiOutlineUser />, path: "/events" },
  ];

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white flex flex-col transition-all duration-300`}
    >
      <div className="p-6 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
        <div className={`${collapsed ? "hidden" : ""}`}>
          Events App: <br />
          <span className="text-[10px] italic">CONSOLATION LOTACHI KEM</span>
        </div>
        <button
          className="text-white text-2xl"
          onClick={() => setCollapsed(!collapsed)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <li
                onClick={() => setActive(item.name)}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700 ${
                  active === item.name ? "bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className={`${collapsed ? "hidden" : ""}`}>
                    {item.name}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
