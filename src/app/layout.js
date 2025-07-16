"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { PanelRightOpen } from "lucide-react";

import localFont from "next/font/local";

const moonjelly = localFont({
  src: [
    {
      path: "../../public/fonts/Moonjelly-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Moonjelly-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-moonjelly",
});

export default function RootLayout({ children }) {
  const [isCloseSideBar, setIsCloseSideBar] = useState(false);

  function handleClodeSideBar() {
    setIsCloseSideBar((prev) => !prev);
  }


  const contentWrapperClass = isCloseSideBar
    ? "w-full"
    : "w-full  md:ml-[200px] md:w-[calc(100%-200px)]";

  return (
    <html lang="en">
      <body>
        <div className="flex font-body">
          <Sidebar isClose={isCloseSideBar} />
          <div className={`${contentWrapperClass} transition`}>
            <div className="flex justify-between items-center gap-x-2 mx-4 mt-2 ">
              <button
                className="rounded-[5px]  flex justify-center items-center  text-neutral-40 hover:bg-neutral-80 w-[30px]  h-[30px] cursor-pointer "
                onClick={handleClodeSideBar}
              >
                <PanelRightOpen size={18} />
              </button>
              <div className="w-full">
                <Navbar />
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
