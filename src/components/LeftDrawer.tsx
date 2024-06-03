"use client";
import React, { useState } from "react";
import { MdSort, MdChevronRight, MdChevronLeft } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Menu1, Menu2, Menu3, Menu4 } from "./_db";

interface MenuItem {
  icon: React.ElementType;
  title: string;
}

const LeftDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:scale-105 duration-300"
        onClick={toggleDrawer}
      >
        <MdSort size={20} color="black" />
      </button>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          padding: "60px 30px",
          overflowY: "auto",
          position: "fixed",
          top: 0,
          left: open ? 0 : "-100%",
          zIndex: 111,
          transition: "left 0.3s ease",
        }}
      >
        <div>
          <div className="flex justify-start mt-4 py-2 px-2 rounded-full ml-4">
            <button className="rounded-full" onClick={toggleDrawer}>
              <MdChevronLeft size={25} color="black" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-2 border-white rounded-full w-32 h-32 flex justify-center items-center drop-shadow-xl bg-gray-50">
              <FaUser size={80} color="black" />
            </div>
            <div className="text-center font-bold text-xl mt-[10px]">
              80757505
            </div>
          </div>
          <div className={`${open ? "animate-slideIn1" : "animate-slideOut1"}`}>
            {Menu1.map((el: MenuItem, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between mt-[25px]"
              >
                <div className="flex items-center gap-[10px]">
                  <div className="text-black">
                    {React.createElement(el.icon)}
                  </div>
                  <div className="text-black">{el.title}</div>
                </div>
                <div>
                  <MdChevronRight size={20} color="black" />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-300 mt-[25px]"></div>
          <div className={`${open ? "animate-slideIn2" : "animate-slideOut2"}`}>
            {Menu2.map((el: MenuItem, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between mt-[25px]"
              >
                <div className="flex items-center gap-[10px]">
                  <div className="text-black">
                    {React.createElement(el.icon)}
                  </div>
                  <div className="text-black">{el.title}</div>
                </div>
                <div>
                  <MdChevronRight size={20} color="black" />
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${open ? "animate-slideIn3" : "animate-slideOut3"} `}
          >
            <div className={` w-full h-[1px] bg-gray-300 mt-[25px]`}></div>
            {Menu3.map((el: MenuItem, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between mt-[25px]"
              >
                <div className="flex items-center gap-[10px]">
                  <div className="text-black">
                    {React.createElement(el.icon)}
                  </div>
                  <div className="text-black">{el.title}</div>
                </div>
                <div>
                  <MdChevronRight size={20} color="black" />
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${open ? "animate-slideIn4" : "animate-slideOut4"} `}
          >
            {Menu4.map((el: MenuItem, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between mt-[25px]"
              >
                <div className="flex items-center gap-[10px]">
                  <div className="text-black">
                    {React.createElement(el.icon)}
                  </div>
                  <div className="text-black">{el.title}</div>
                </div>
                <div>{/* Switch component goes here */}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("phoneNumber");
              window.location.reload();
            }}
            className="flex items-center gap-[10px] text-red-500 mt-[55px] w-full justify-center "
          >
            <CiLogout size={20} color="red" />
            <span>Гарах</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawer;
