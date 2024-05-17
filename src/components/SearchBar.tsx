"use client";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { useAddressData } from "./Context/Address";

const SearchBar = () => {
  const { address } = useAddressData();

  return (
    <div className=" h-[30%] bg-white px-[8px] py-[2%] rounded-[20px] flex gap-[8px] justify-between items-center shadow-lg">
      <Image src="/Icon.svg" width={25} height={20} alt="Search Icon" />
      <TextField
        sx={{
          backgroundColor: "#F7F7F7",
          borderRadius: "20px",
          width: "90%",
          display: "flex",
          alignItems: "center",
          padding: "2px 5px",
          // height: "60%",
        }}
        defaultValue={address?.display_name}
        id="input-with-icon-textfield"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CiStar size={30} />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        variant="standard"
      />
    </div>
  );
};

export default SearchBar;
