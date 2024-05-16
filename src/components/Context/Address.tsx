"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FullAddress } from "../../types";

type AddressDataContextType = {
  address: FullAddress;
  setAddress: React.Dispatch<React.SetStateAction<FullAddress>>;
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
  const [address, setAddress] = useState<FullAddress>({
    address: {
      ISO3166_2_lvl4: "",
      building: "",
      city: "",
      city_district: "",
      country: "",
      country_code: "",
      house_number: "",
      postcode: "",
      road: "",
      suburb: "",
    },

    boundingbox: {
      north: "",
      south: "",
      east: "",
      west: "",
    },

    display_name: "",
    lat: "",
    licence: "",
    lon: "",
    osm_id: 0,
    osm_type: "",
    place_id: 0,
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
