"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TbCurrentLocation } from "react-icons/tb";
import { Icon } from "leaflet";
import { IonSpinner } from "@ionic/react";
import { useAddressData } from "./Context/Address";

import Image from "next/image";
import { useRoadData } from "./Context/Road";

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
  const { road, setRoad } = useRoadData();
  const { address, setAddress } = useAddressData();
  const [center, setCenter] = useState<Center>({
    lat: 47.918873,
    lng: 106.917595,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showChooseButton, setShowChooseButton] = useState<boolean>(false);

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

        if (address.status === "Come") {
          setAddress((prev) => ({
            ...prev,
            display_name: data.display_name,
          }));
        } else {
          setAddress((prev) => ({
            ...prev,
            go_name: data.display_name,
          }));
        }
        if (road.status === "Come") {
          setRoad((prev) => ({
            ...prev,
            start: {
              lat: center.lat,
              lon: center.lng,
            },
          }));
        } else {
          setRoad((prev) => ({
            ...prev,
            end: {
              lat: center.lat,
              lon: center.lng,
            },
          }));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getAddress();
  }, [center, setAddress, setRoad, address.status, road.status]);

  useEffect(() => {
    if (road.end.lat !== 0 && road.end.lon !== 0 && address.go_name !== "") {
      setShowChooseButton(true);
    } else {
      setShowChooseButton(false);
    }
  }, [road.end, address.go_name]);

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

  const handleChooseButtonClick = () => {
    setRoad((prev) => ({
      ...prev,
      status: "Done",
    }));
    setShowChooseButton(false);
  };

  return (
    <div className="container relative">
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={zoom}
        style={{
          height: "100vh",
          width: "100vw",
          // position: "relative",
          zIndex: "1",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CenterListener setCenter={setCenter} />
        <SetMapCenter center={center} />
        {/* <Marker position={[center.lat, center.lng]} icon={locationIcon} /> */}
      </MapContainer>
      {road.status === "Come" ? (
        <Image
          src="/Mappin.svg"
          alt="Location"
          width={106}
          height={100}
          className="absolute md:left-[55%] left-[50%] top-[46.8%] transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 duration-200"
        />
      ) : (
        <Image
          src="/goto.svg"
          alt="Location"
          width={106}
          height={100}
          className="absolute md:left-[55%] left-[50%] top-[46.8%] transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 duration-200"
        />
      )}

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

      {showChooseButton && (
        <button
          className="absolute right-10 z-10 bottom-[26%] hover:scale-105 duration-200 bg-[black] text-white px-3 py-1 rounded-xl"
          onClick={handleChooseButtonClick}
        >
          Сонгох
        </button>
      )}
    </div>
  );
};

export default OpenStreetMap;
