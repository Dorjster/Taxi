"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Road } from "../../types";

type RoadDataContextType = {
  road: Road;
  setRoad: React.Dispatch<React.SetStateAction<Road>>;
};

const RoadContext = createContext<RoadDataContextType | undefined>(undefined);

type RoadProviderProps = {
  children: ReactNode;
};

export const RoadProvider: React.FC<RoadProviderProps> = ({ children }) => {
  const [road, setRoad] = useState({
    start: {
      lat: 0,
      lon: 0,
    },
    end: {
      lat: 0,
      lon: 0,
    },
    status: "Come",
  });

  return (
    <RoadContext.Provider value={{ road, setRoad }}>
      {children}
    </RoadContext.Provider>
  );
};

export const useRoadData = () => {
  const context = useContext(RoadContext);
  if (!context) {
    throw new Error("error bn");
  }
  return context;
};
