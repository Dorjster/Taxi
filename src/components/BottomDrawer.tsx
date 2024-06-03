"use client";
import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Delivery, Driver, cabs } from "./_db";
import SwiperDetail from "./SwiperDetail";
import Drawerr from "./Swiper1";

export interface ItemData {
  image: string;
  title: string;
  description: string;
  price: number;
}

const BottomDrawer = () => {
  const [selectedData, setSelectedData] = useState<ItemData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleCall = (data: ItemData) => {
    setSelectedData(data);

    setIsDrawerOpen(true);
  };

  return (
    // <>
    <div className="w-full overflow-auto">
      <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{ x: 0, y: 380 }}
        grid={[1, 1]}
        scale={1}
        bounds={{ bottom: 380, top: 0 }}
        nodeRef={drawerRef}
      >
        <div
          ref={drawerRef}
          className={`handle drawer bg-white w-full absolute bottom-0 h-[630px] rounded-t-[20px] shadow-inner overflow-scroll `}
          style={{
            transform: isDrawerOpen ? "translateY(0)" : "translateY(0)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className="handle flex justify-center bg-white items-center h-6 w-full cursor-grab rounded-[20px]">
            <div className="h-[5px] w-[20%] bg-gray-200 rounded-full"></div>
          </div>
          <div className="content p-4">
            <div>Такси үйлчилгээ</div>
            {cabs.map((cab, index) => (
              <div
                onTouchEnd={() => {
                  handleCall(cab);
                }}
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden"
              >
                <SwiperDetail
                  image={cab.image}
                  title={cab.title}
                  description={cab.description}
                  price={cab.price}
                />
              </div>
            ))}
            <div>Хүргэлт</div>
            {Delivery.map((delivery, index) => (
              <div
                onTouchEnd={() => {
                  handleCall(delivery);
                }}
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden"
              >
                <SwiperDetail
                  image={delivery.image}
                  title={delivery.title}
                  description={delivery.description}
                  price={delivery.price}
                />
              </div>
            ))}
            <div>Дуудлагын жолооч</div>
            {Driver.map((driver, index) => (
              <div
                onTouchEnd={() => {
                  handleCall(driver);
                }}
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden"
              >
                <SwiperDetail
                  image={driver.image}
                  title={driver.title}
                  description={driver.description}
                  price={driver.price}
                />
              </div>
            ))}
          </div>
        </div>
      </Draggable>
      <div>
        <Drawerr
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          data={selectedData as ItemData}
        />
      </div>
    </div>
  );
};

export default BottomDrawer;
