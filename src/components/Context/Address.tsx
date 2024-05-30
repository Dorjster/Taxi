"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Address } from "../../types";

type AddressDataContextType = {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

const AddressContext = createContext<AddressDataContextType | undefined>(
  undefined
);

type AddressProviderProps = {
  children: ReactNode;
};

export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address>({
    display_name: "",
    go_name: "",
    status: "Come",
  });

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressData = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("error bn");
  }
  return context;
};
