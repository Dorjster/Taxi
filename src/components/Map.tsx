"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Center {
  lat: number;
  lng: number;
}

const OpenStreetMap = () => {
  const [center, setCenter] = useState<Center>({
    lat: 47.918873,
    lng: 106.917595,
  });

  const ZOOM_LEVEL = 16;

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="container">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} />
      </MapContainer>
      <button onClick={handleGetCurrentLocation}>Show Current Location</button>
    </div>
  );
};

export default OpenStreetMap;
