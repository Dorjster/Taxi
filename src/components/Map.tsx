"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TbCurrentLocation } from "react-icons/tb";
import { IonSpinner } from "@ionic/react";
import { useAddressData } from "./Context/Address";
import "leaflet-routing-machine";
import L from "leaflet";

import Image from "next/image";
import { useRoadData } from "./Context/Road";
import { useLoadingContext } from "./Context/Loading";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/Mappin.svg",
  iconUrl: "/goto.svg",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Center {
  lat: number;
  lng: number;
}

type LineStyle = {
  color: string;
  opacity: number;
  weight: number;
};

type LineOptions = {
  styles: LineStyle[];
  extendToWaypoints: boolean;
  missingRouteTolerance: number;
};

const SetMapCenter = ({
  center,
  setMapInstance,
}: {
  center: Center;
  setMapInstance: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const map = useMap();

  useEffect(() => {
    setMapInstance(map);
  }, [map, setMapInstance]);

  useEffect(() => {
    map.flyTo([center.lat, center.lng]);
  }, [center, map]);

  return null;
};

console.log(process.env.API);
const OpenStreetMap = () => {
  const { road, setRoad } = useRoadData();
  const { address, setAddress } = useAddressData();
  const [center, setCenter] = useState<Center>({
    lat: 47.918873,
    lng: 106.917595,
  });
  const { loading1, setLoading1 } = useLoadingContext();
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showChooseButton, setShowChooseButton] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(17);
  const [routingControl, setRoutingControl] = useState<any>(null);

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
      }, 200);

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

  const lineOptions: LineOptions = {
    styles: [{ color: "black", opacity: 1, weight: 3 }],
    extendToWaypoints: true,
    missingRouteTolerance: 100,
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        setLoading1(true);
        const url = `https://geocode.maps.co/reverse?lat=${center.lat}&lon=${center.lng}&api_key=664413790747f007359223ewsbc990e`;
        const response = await fetch(url);
        const data = await response.json();

        if (address.status === "Come") {
          setAddress((prev) => ({
            ...prev,
            display_name: data.display_name,
          }));
        } else if (road.status !== "Done") {
          setAddress((prev) => ({
            ...prev,
            go_name: data.display_name,
          }));
        }

        if (road.status !== "Done") {
          if (road.status === "Come") {
            setRoad((prev) => ({
              ...prev,
              start: {
                lat: center.lat,
                lon: center.lng,
              },
            }));
          } else if (road.status === "go to") {
            setRoad((prev) => ({
              ...prev,
              end: {
                lat: center.lat,
                lon: center.lng,
              },
            }));
          }
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading1(false);
      }
    };

    if (
      (address.status === "Come" && road.status !== "Done") ||
      (road.status !== "Done" && address.status !== "Done")
    ) {
      getAddress();
    }
  }, [center, setAddress, setRoad, address.status, road.status, setLoading1]);

  useEffect(() => {
    if (
      road.end.lat !== 0 &&
      road.end.lon !== 0 &&
      address.go_name !== address.display_name &&
      address.go_name !== "" &&
      road.status !== "Done" &&
      !loading1
    ) {
      setShowChooseButton(true);
    } else {
      setShowChooseButton(false);
    }
  }, [road.end, address.go_name, address.display_name, road.status, loading1]);

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

  useEffect(() => {
    if (
      road.end.lat !== 0 &&
      road.end.lon !== 0 &&
      address.go_name !== address.display_name &&
      address.go_name !== "" &&
      road.status === "Done"
    ) {
    } else if (routingControl && mapInstance) {
      mapInstance.removeControl(routingControl);
      setRoutingControl(null);
    }
  }, [
    road.end,
    address.go_name,
    address.display_name,
    road.status,
    routingControl,
    mapInstance,
  ]);

  const handleChooseButtonClick = () => {
    setRoad((prev) => ({
      ...prev,
      status: "Done",
    }));

    if (mapInstance && road.start && road.end) {
      if (routingControl) {
        mapInstance.removeControl(routingControl);
        setRoutingControl(null);
      }

      const control = L.Routing.control({
        waypoints: [
          L.latLng(road.start.lat, road.start.lon),
          L.latLng(road.end.lat, road.end.lon),
        ],
        routeWhileDragging: false,
        show: false,
        lineOptions: lineOptions,
        fitSelectedRoutes: true,
      });
      control.on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;
        setRoad((prev) => ({
          ...prev,
          distance: summary.totalDistance,
          duration: summary.totalTime,
        }));
      });
      control.addTo(mapInstance);
      setRoutingControl(control);
    }
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
          zIndex: 0,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterListener setCenter={setCenter} />
        <SetMapCenter center={center} setMapInstance={setMapInstance} />
      </MapContainer>
      {road.status !== "Done" && (
        <>
          {road.status === "Come" ? (
            <Image
              src="/Mappin.svg"
              alt="Location"
              width={106}
              height={100}
              className=" w-auto h-auto absolute -z-0 md:left-[55%] left-[50%] top-[46.8%] transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 duration-200"
            />
          ) : (
            <Image
              src="/goto.svg"
              alt="Location"
              width={106}
              height={100}
              className="w-auto h-auto  absolute md:left-[55%] left-[50%] top-[46.8%] transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 duration-200"
            />
          )}
        </>
      )}

      <button
        className="absolute -z-0 right-3 top-[45%]  bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:scale-105 duration-100"
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
          className="absolute right-10 -z-0 bottom-[42%] right-[3%] hover:scale-105 duration-200 bg-[white] text-black px-3 py-1 rounded-xl shadow-2xl"
          onClick={handleChooseButtonClick}
        >
          Сонгох
        </button>
      )}
    </div>
  );
};

export default OpenStreetMap;
