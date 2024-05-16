"use client";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TbCurrentLocation } from "react-icons/tb";
import { Icon } from "leaflet";
import { IonSpinner } from "@ionic/react";
import { useAddressData } from "./Context/Address";
import axios from "axios";
import Image from "next/image";

interface Center {
  lat: number;
  lng: number;
}

const SetMapCenter = ({ center }: { center: Center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([center.lat, center.lng]);
  }, [center, map]);

  return null;
};

const OpenStreetMap = () => {
  const { address, setAddress } = useAddressData();
  const [center, setCenter] = useState<Center>({
    lat: 47.918873,
    lng: 106.917595,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const locationIcon = new Icon({
    iconUrl: "/Mappin.svg",
    iconSize: [92, 106],
    iconAnchor: [46, 80],
  });

  const [zoom, setZoom] = useState<number>(17);

  const CenterListener = ({
    setCenter,
  }: {
    setCenter: React.Dispatch<React.SetStateAction<Center>>;
  }) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const map = useMapEvent("moveend", () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        const newCenter = map.getCenter();
        setCenter({
          lat: newCenter.lat,
          lng: newCenter.lng,
        });
      }, 500);

      setTimeoutId(newTimeoutId);
    });

    useEffect(() => {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [timeoutId]);

    return null;
  };
  useEffect(() => {
    const getAddress = async () => {
      const url = `https://geocode.maps.co/reverse?lat=${center.lat}&lon=${center.lng}&api_key=664413790747f007359223ewsbc990e`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAddress(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAddress();
  }, [center, setAddress]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
          alert("yr ni boldgue ho");
        }
      );
      setZoom(16);
    } else {
      alert("Geolocation ajilkueno");
    }
  };

  return (
    <div className="container relative">
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={zoom}
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          zIndex: "1",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CenterListener setCenter={setCenter} />
        <SetMapCenter center={center} />
        {/* <Marker position={[center.lat, center.lng]} icon={locationIcon} /> */}
      </MapContainer>
      <Image
        src="/Очих-газар.svg"
        alt="Location"
        width={92}
        height={106}
        className="absolute left-[39.5%] top-[43%] z-10 "
      />
      <button
        className="absolute right-3 top-[45%] z-10 bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg"
        onClick={handleGetCurrentLocation}
      >
        {loading ? (
          <IonSpinner className="text-black" name="circles"></IonSpinner>
        ) : (
          <TbCurrentLocation color="black" size={20} fontWeight={100} />
        )}
      </button>
    </div>
  );
};

export default OpenStreetMap;
