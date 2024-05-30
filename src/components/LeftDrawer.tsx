"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Switch from "@mui/material/Switch";
import { MdSort } from "react-icons/md";
import { Menu1, Menu2, Menu3, Menu4 } from "./_db";
import { FaUser } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";

const LeftDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const number =
    typeof window !== "undefined" ? localStorage.getItem("phoneNumber") : null;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const DrawerList = (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: "white",
        padding: "60px 30px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={open ? "animate-slideIn" : "animate-slideOut"}
    >
      <div className={open ? "animate-slideIn1" : "animate-slideOut1"}>
        <div className="fixed flex justify-start mt-4   py-2 px-2 rounded-full ml-4 ">
          <button className="rounded-full" onClick={toggleDrawer(false)}>
            <IoChevronBack size={25} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="border-2 border-white  rounded-full w-32 h-32 flex justify-center items-center drop-shadow-xl bg-gray-50 ">
            <FaUser size={80} color="black" />
          </div>

          <div className="text-center font-bold text-xl mt-[10px]">
            {number}
          </div>
        </div>
        {/* </div> */}
        <div className={open ? "animate-slideIn1" : "animate-slideOut1"}>
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
        </div>
        <div className={open ? "animate-slideIn2" : "animate-slideOut2"}>
          <div className="w-full h-[1px] bg-gray-300 mt-[25px]"></div>
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
        </div>
        <div className={open ? "animate-slideIn3" : "animate-slideOut3"}>
          <div className="w-full h-[1px] bg-gray-300 mt-[25px]"></div>
          {Menu3.map((el, index) => (
            <div key={index} className="flex items-center  justify-between">
              <div className="flex items-center mt-[25px] gap-[10px]">
                <div>{React.createElement(el.icon)}</div>
                <div>{el.title}</div>
              </div>
              <div>
                <MdChevronRight size={20} color="black" className="mt-[25px]" />
              </div>
            </div>
          ))}
        </div>
        <div className={open ? "animate-slideIn4" : "animate-slideOut4"}>
          {Menu4.map((el, index) => (
            <div key={index} className="flex items-center  justify-between ">
              <div className="flex items-center mt-[25px] gap-[10px]">
                <div>{React.createElement(el.icon)}</div>
                <div className="">{el.title}</div>
              </div>
              <div>
                <Switch
                  {...label}
                  size="small"
                  className="mt-[25px]"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "black",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#B0B0B0",
                    },
                    "& .MuiSwitch-switchBase": {
                      color: "gray",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#B0B0B0",
                    },
                  }}
                />
              </div>
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
    </Box>
  );

  return (
    <div>
      <button
        className="  bg-white w-12 h-12 rounded-full flex justify-center items-center shadow-lg hover:scale-105 duration-300"
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
