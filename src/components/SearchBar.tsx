"use client";
import React from "react";
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
        <div
          onClick={() => {
            setRoad((prev) => ({ ...prev, status: "Come" }));
            setAddress((prev) => ({ ...prev, status: "Come" }));
          }}
          className="flex gap-[10px] items-center  bg-[#F7F7F7] rounded-[20px] justify-center px-[10px]"
        >
          <input
            type="text"
            value={address?.display_name}
            placeholder="Очих хаяг"
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, display_name: e.target.value }));
            }}
            className="bg-[#F7F7F7]  px-[2px] py-[5px] text-black"
          />
          {road.status === "Come" && loading1 ? (
            <IonSpinner className="text-black" name="lines-small"></IonSpinner>
          ) : (
            <CiStar
              size={30}
              color="black"
              onClick={() => {
                if (road.status === "Come") {
                  setLoading1(true);
                } else {
                  address.display_name = "";
                }
              }}
            />
          )}
        </div>
        <div
          onClick={() => {
            setRoad((prev) => ({ ...prev, status: "go to" }));
            setAddress((prev) => ({ ...prev, status: "go to" }));
          }}
          className="flex gap-[10px] items-center  bg-[#F7F7F7] rounded-[20px] justify-center px-[10px]"
        >
          <input
            type="text"
            value={address?.go_name}
            placeholder="Авах хаяг"
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, go_name: e.target.value }));
            }}
            className="bg-[#F7F7F7]  px-[2px] py-[5px] text-black"
          />
          {road.status === "go to" && loading1 ? (
            <IonSpinner className="text-black" name="lines-small"></IonSpinner>
          ) : address.go_name === "" ? (
            <CiStar
              color="black"
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
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
