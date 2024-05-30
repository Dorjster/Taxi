"use client";
import TemporaryDrawer from "@/components/LeftDrawer";
import SearchBar from "@/components/SearchBar";
import SwipeableEdgeDrawer from "@/components/SwipeableEdge";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const Maps = () => {
  const { push } = useRouter();

  useEffect(() => {
    const number = localStorage.getItem("phoneNumber");
    if (number !== null && number !== "") {
      push("/map");
    } else {
      push("/");
    }
  }, [push]);

  return (
    <div className="w-[100vw] relative ">
      <Map />
      <div className="flex flex-col items-center px-[20px]">
        <div className="absolute top-0 z-10 pt-[50px] flex gap-[8px] justify-center items-center w-full px-[2%]">
          {" "}
          <TemporaryDrawer />
          <SearchBar />
        </div>
        <div className="">
          {" "}
          <SwipeableEdgeDrawer />
        </div>
      </div>
    </div>
  );
};

export default Maps;
