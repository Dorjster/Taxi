"use client";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { useAddressData } from "./Context/Address";
import { useRoadData } from "./Context/Road";

const SearchBar = () => {
  const { address, setAddress } = useAddressData();
  const { road, setRoad } = useRoadData();

  return (
    <div className=" h-[30%] bg-white px-[8px] py-[2%] rounded-[20px] flex gap-[10px] justify-between items-center shadow-lg">
      <Image src="/Icon.svg" width={25} height={20} alt="Search Icon" />
      <div className="flex flex-col gap-[8px]">
        {" "}
        <TextField
          onClick={() => {
            setRoad((prev) => ({ ...prev, status: "Come" }));
            setAddress((prev) => ({ ...prev, status: "Come" }));
          }}
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
          placeholder="Авах хаяг"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CiStar
                  size={30}
                  onClick={() => {
                    address.display_name = "";
                    // address.status = "Come";
                  }}
                />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          variant="standard"
        />
        <TextField
          onClick={() => {
            setRoad((prev) => ({ ...prev, status: "go to" }));
            setAddress((prev) => ({ ...prev, status: "go to" }));
          }}
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "20px",
            width: "90%",
            display: "flex",
            alignItems: "center",
            padding: "2px 5px",
            // height: "60%",
          }}
          defaultValue={address?.go_name}
          id="input-with-icon-textfield"
          placeholder="Очих хаяг"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {address.go_name === "" ? (
                  <CiStar
                    size={30}
                    onClick={() => {
                      address.go_name = "";
                    }}
                  />
                ) : (
                  <div
                    className="w-[30px] text-[18px] px-[10px]"
                    onClick={() => {
                      address.go_name = "";
                      // address.status = "go to";
                    }}
                  >
                    x
                  </div>
                )}
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          variant="standard"
        />
      </div>
    </div>
  );
};

export default SearchBar;
