import React, { use, useEffect } from "react";
import { InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { useAddressData } from "./Context/Address";
import { useRoadData } from "./Context/Road";
import { useLoadingContext } from "./Context/Loading";
import { IonSpinner } from "@ionic/react";

const SearchBar = () => {
  const { address, setAddress } = useAddressData();
  const { setRoad } = useRoadData();
  const { loading1, setLoading1 } = useLoadingContext();
  const { road } = useRoadData();

  // const handleAddressChange = (newValue: string) => {
  //   setLoading1(true);
  //   setAddress((prev) => ({ ...prev, display_name: newValue }));
  //   setLoading1(false);
  // };

  // const handleGoAddressChange = (newValue: string) => {
  //   setLoading1(true);
  //   setAddress((prev) => ({ ...prev, go_name: newValue }));
  //   setLoading1(false);
  // };

  return (
    <div className=" h-[30%] bg-white px-[8px] py-[2%] rounded-[20px] flex gap-[10px] justify-between items-center shadow-lg">
      <Image
        src="/Icon.svg"
        width={25}
        height={20}
        alt="Search Icon"
        className="w-auto h-auto"
      />
      <div className="flex flex-col gap-[8px]">
        <TextField
          onClick={() => {
            setRoad((prev) => ({ ...prev, status: "Come" }));
            setAddress((prev) => ({ ...prev, status: "Come" }));
          }}
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "20px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "2px 5px",
          }}
          // aria-readonly="true"
          // onChange={(e) => handleAddressChange(e.target.value)}
          value={address?.display_name}
          id="input-with-icon-textfield"
          placeholder="Авах хаяг"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {road.status === "Come" && loading1 ? (
                  <IonSpinner
                    className="text-black"
                    name="lines-small"
                  ></IonSpinner>
                ) : (
                  <CiStar
                    size={30}
                    onClick={() => {
                      if (road.status === "Come") {
                        setLoading1(true);
                      } else {
                        address.display_name = "";
                      }
                    }}
                  />
                )}
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "2px 5px",
          }}
          // aria-readonly="true"
          value={address?.go_name}
          // onChange={(e) => handleGoAddressChange(e.target.value)}
          id="input-with-icon-textfield"
          placeholder="Очих хаяг"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {road.status === "go to" && loading1 ? (
                  <IonSpinner
                    className="text-black"
                    name="lines-small"
                  ></IonSpinner>
                ) : address.go_name === "" ? (
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
