import TemporaryDrawer from "@/components/LeftDrawer";
import SearchBar from "@/components/SearchBar";
import SwipeableEdgeDrawer from "@/components/SwipeableEdge";
import dynamic from "next/dynamic";
import React from "react";

// import Map from "../components/Map";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

const page = () => {
  return (
    <div className="w-[100vw] relative ">
      <Map />
      <div className="flex flex-col items-center px-[20px]">
        <div className="absolute top-0 z-10 pt-[50px] flex gap-[8px] justify-center w-full px-[2%]">
          {" "}
          <TemporaryDrawer />
          <SearchBar />
        </div>
        <div className="w-[100vw]">
          {" "}
          <SwipeableEdgeDrawer />
        </div>
      </div>
    </div>
  );
};

export default page;
