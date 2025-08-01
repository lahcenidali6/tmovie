"use client";
import {
  FaCompass,
  FaRegHeart,
  FaRegQuestionCircle,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import { MdContactPhone } from "react-icons/md";
import { Crown } from "lucide-react";
import logo from "../assets/Logo.png";

export default function Sidebar(isClose) {
  return (
    <div
      className={`fixed hidden md:block h-screen  w-[200px] z-30    pr-[0.5px] bg-gradient-to-t from-neutral-90 via-neutral-30 to-neutral-90      ${
        isClose.isClose ? "translate-x-[-200px]" : "translate-x-[0px]"
      }  transition`}
      style={{ scrollbarWidth: "none" }}
    >
      <div className="bg-neutral-90 h-full py-6 flex flex-col justify-between text-white">
        {/**logo */}
        <div>
          <div className="flex justify-center items-center mb-10">
            <Image src={logo} alt="Logo" width={134} height={65} />
          </div>

          {/* Menu */}
          <nav className=" text-neutral-30 flex flex-col gap-y-11  ">
            <div className="space-y-4 relative after:content-[''] after:absolute  after:bottom-[-22px] after:w-[87%] after:left-[50%] after:translate-x-[-50%] after:h-[0.5px] after:bg-neutral-70">
              <p className="text-xs text-neutral-60 ml-6">Menu</p>
              <SidebarItem icon={<FaCompass />} label="Discover" active />
              <SidebarItem icon={<FaRegHeart />} label="Watchlist" />
              <SidebarItem icon={<FaRegQuestionCircle />} label="Blog" />
              <SidebarItem icon={<FaUsers />} label="Artists" />
            </div>

            <div className="space-y-4">
              <SidebarItem icon={<MdContactPhone />} label="Contact Us" />
              <SidebarItem icon={<FaRegQuestionCircle />} label="Help Center" />
              <SidebarItem icon={<FaCog />} label="Setting" />
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="relative  rounded-xl p-[1px] bg-gradient-to-b from-neutral-50 to-neutral-90 mx-3">
          <div className="rounded-xl bg-neutral-90 text-white p-4">
            <p className="text-xs text-gray-300 leading-tight mb-2 text-center">
              Click the button below <br /> to see the plans
            </p>
            <button className="flex items-center gap-2 border border-primary-40 text-primary-40 text-sm font-medium px-4 py-2 rounded-md hover:bg-primary-40 hover:text-white transition  mx-auto">
              <Crown size={18} />
              see plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <a href={`/${label.toLowerCase()}`}
      className={`flex items-center relative gap-3 px-2 py-2 rounded cursor-pointer  transition-all  after:content-[''] ${
        active ? "after:absolute text-primary-50 bg-gradient-to-r from-neutral-80 to-neutral-90" : ""
      }    after:left-[0] after:h-full after:w-[6px] after:bg-yellow-400 after:rounded-tr-full after:rounded-br-full before:rounded-br-full hover:bg-neutral-80 transition-all`}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-sm font-medium truncate">{label}</span>
    </a>
  );
}
