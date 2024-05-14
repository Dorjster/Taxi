import dynamic from "next/dynamic";
import React from "react";

// import Map from "../components/Map";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

const page = () => {
  return (
    <div className="w-full">
      <Map />
    </div>
  );
};

export default page;
