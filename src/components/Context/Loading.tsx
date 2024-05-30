"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
  loading1: boolean;
  setLoading1: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading1, setLoading1] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading1, setLoading1 }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("ssss");
  }
  return context;
};
