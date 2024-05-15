"use client";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { useAddressData } from "./Context/Address";

const SearchBar = () => {
  const { address } = useAddressData();
  const addre = address?.address;

  return (
    <div className="bg-white px-[10px] py-[3px] rounded-[20px] flex gap-[8px] justify-between items-center shadow-lg">
      <Image src="/Icon.svg" width={25} height={20} alt="Search Icon" />
      <TextField
        sx={{
          backgroundColor: "#F7F7F7",
          borderRadius: "20px",
          width: "90%",
          display: "flex",
          alignItems: "center",
          padding: "5px 10px",
          height: "80%",
        }}
        defaultValue={addre?.building}
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
