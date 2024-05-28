"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { MdSort } from "react-icons/md";
import { Menu1, Menu2, Menu3 } from "./_db";

import { FaUser } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const LeftDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const number =
    typeof window !== "undefined" ? localStorage.getItem("phoneNumber") : null;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: "white",
        padding: "60px 30px",
        overflowY: "auto",
      }}
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="fixed flex justify-start mt-4  bg-gray-100 py-2 px-4 rounded-full ml-4">
        <button className="rounded-full" onClick={toggleDrawer(false)}>
          X
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="border-2 border-white  rounded-full w-32 h-32 flex justify-center items-center drop-shadow-xl bg-gray-50 ">
          <FaUser size={80} color="black" />
        </div>
        <div className="text-center font-bold text-xl mt-[10px]">{number}</div>
      </div>
      {Menu1.map((el, index) => (
        <div key={index} className="flex items-center  justify-between ">
          <div className="flex items-center mt-[25px] gap-[10px]">
            <div>{React.createElement(el.icon)}</div>
            <div>{el.title}</div>
          </div>
          <div>
            <MdChevronRight size={20} color="black" className="mt-[25px]" />
          </div>
        </div>
      ))}

      {Menu2.map((el, index) => (
        <div key={index} className="flex items-center  justify-between ">
          <div className="flex items-center mt-[25px] gap-[10px]">
            <div>{React.createElement(el.icon)}</div>
            <div>{el.title}</div>
          </div>
          <div>
            <MdChevronRight size={20} color="black" className="mt-[25px]" />
          </div>
        </div>
      ))}

      {Menu3.map((el, index) => (
        <div key={index} className="flex items-center  justify-between ">
          <div className="flex items-center mt-[25px] gap-[10px]">
            <div>{React.createElement(el.icon)}</div>
            <div>{el.title}</div>
          </div>
          <div>
            <MdChevronRight size={20} color="black" className="mt-[25px]" />
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          localStorage.removeItem("phoneNumber");
          window.location.reload();
        }}
        className="flex items-center gap-[10px] text-red-500 mt-[55px] w-full justify-center "
      >
        <CiLogout size={20} color="red" className="" />
        <span>Гарах</span>
      </button>
    </Box>
  );

  return (
    <div>
      <button
        className="  bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg "
        onClick={toggleDrawer(true)}
      >
        <MdSort size={20} color="black" />
      </button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default LeftDrawer;
