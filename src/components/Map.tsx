"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TbCurrentLocation } from "react-icons/tb";
import { Icon } from "leaflet";
import { IonSpinner } from "@ionic/react";

interface Center {
  lat: number;
  lng: number;
}

const SetMapCenter = ({ center }: { center: Center }) => {
  const map = useMap();
  map.flyTo([center.lat, center.lng]);

  return null;
};

const OpenStreetMap = () => {
  const [center, setCenter] = useState<Center>({
    lat: 47.918873,
    lng: 106.917595,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const locationIcon = new Icon({
    iconUrl: "/location-2955.svg",
    iconSize: [42, 42],
    iconAnchor: [16, 32],
  });

  const [zoom, setZoom] = useState<number>(17);
  //   console.log(center);

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((el) => {
      console.log(el.coords.latitude);
    });

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
        // bounds={bounds}
        // maxBounds={bounds}
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          zIndex: "1",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center.lat !== 47.918873 && center.lng !== 106.917595 ? (
          <Marker position={center} icon={locationIcon} />
        ) : (
          <div></div>
        )}

        <SetMapCenter center={center} />
      </MapContainer>
      <button
        className="absolute right-3 top-[60%] z-10 bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg"
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
