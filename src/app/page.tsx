import dynamic from "next/dynamic";
import TemporaryDrawer from "@/components/LeftDrawer";
import React from "react";
import SearchBar from "@/components/SearchBar";
import BottomDrawer from "@/components/BottomDrawer";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  return (
    <div className="w-[100vw] relative overflow-hidden">
      <Map />
      <div className="absolute top-8 w-full flex justify-center gap-[15px] items-center z-30 px-[2%] ">
        <TemporaryDrawer />
        <SearchBar />
      </div>
      <div className="absolute z-20 bottom-0 w-full  ">
        <BottomDrawer />
      </div>
    </div>
  );
};

export default Page;
