"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdSort } from "react-icons/md";

const LeftDrawer = () => {
  const [open, setOpen] = React.useState(false);

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
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Button
        className="absolute top-[5%] left-[5%]"
        onClick={toggleDrawer(false)}
      >
        x
      </Button>
    </Box>
  );

  return (
    <div>
      <button
        className="  bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg "
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