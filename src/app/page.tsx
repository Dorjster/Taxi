import TemporaryDrawer from "@/components/LeftDrawer";
import SearchBar from "@/components/SearchBar";
import SwipeableEdgeDrawer from "@/components/SwipeableEdge";
import dynamic from "next/dynamic";
import React from "react";

// import Map from "../components/Map";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

const page = () => {
  return (
    <div className="w-full relative">
      <Map />
      <div className="flex flex-col items-center">
        <div className="absolute top-0 z-10  pt-16 flex gap-[8px] justify-center w-full">
          {" "}
          <TemporaryDrawer />
          <SearchBar />
        </div>
        <div className="absolute top-0 z-20">
          {" "}
          <SwipeableEdgeDrawer />
        </div>
      </div>
    </div>
  );
};

export default page;
