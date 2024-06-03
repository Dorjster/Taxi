"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { Money } from "./_db";
import Image from "next/image";
import { useAddressData } from "./Context/Address";
import { useRoadData } from "./Context/Road";
import { CiLocationOn } from "react-icons/ci";
import { ItemData } from "./BottomDrawer";
import SwiperDetail from "./SwiperDetail";

interface SwipeableTemporaryDrawerProps {
  open: boolean;
  onClose: () => void;
  data: ItemData;
}

export function Drawerr({
  open,
  onClose,
  data,
}: SwipeableTemporaryDrawerProps) {
  const { road } = useRoadData();
  const { address } = useAddressData();

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[80%] bg-white overflow-auto transition-transform rounded-t-2xl transform ease-in-out duration-500 ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="px-6 py-2 overflow-y-auto mb-[50px] flex flex-col gap-[10px]">
        <div className="h-[5px] w-[20%] bg-gray-200 rounded-full mb-[20px] mx-auto"></div>
        <SwiperDetail
          image={data?.image}
          title={data?.title}
          description={data?.description}
          price={data?.price}
        />
        <div>Очиж авах хаяг</div>
        <div className="bg-[#F7f7f7] px-[8px] py-[3px] rounded-[16px] flex gap-[8px] justify-between items-center ">
          <Image src="/Icon.svg" width={20} height={20} alt="Search Icon" />
          <input
            type="text"
            defaultValue={address?.display_name}
            className="w-full bg-[#F7F7F7] rounded-[16px] p-1 outline-none"
            placeholder="Address"
          />
        </div>
        {road.status === "Done" && (
          <div>
            <div>Хүргэх хаяг</div>
            <div className="bg-[#F7f7f7] px-[8px] py-[3px] rounded-[16px] flex gap-[8px] justify-between items-center ">
              <CiLocationOn size={25} className="mr-2" />
              <input
                type="text"
                defaultValue={address?.go_name}
                className="w-full bg-[#F7F7F7] rounded-[16px] p-1 outline-none"
                placeholder="Destination Address"
              />
            </div>
            <div>
              <div className="flex flex-col gap-[10px] mt-[10px]">
                <div className="flex justify-between items-center">
                  Аяллын урт :{" "}
                  <span className="font-semibold">
                    {road.distance <= 1000
                      ? `${road.distance} м`
                      : `${(road.distance / 1000).toFixed(2)} км`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  Урьдчилсан үнэ :{" "}
                  <span className="font-semibold">
                    {Math.floor((road.distance / 1000) * data?.price)}₮
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <div>Хаягийн дэлгэрэнгүй (заавал биш)</div>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-[16px] p-1 outline-none"
            placeholder="Address Description"
          />
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px] border border-gray-200 p-4 rounded-[16px]">
          <div>Жолоочийн урамшуулал</div>
          <div>
            <input
              type="range"
              className="w-full bg-transparent cursor-pointer mt-[10px] appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
  [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-white
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-white
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-100
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full


  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full"
              id="steps-range-slider-usage"
              min="0"
              max="5"
              step="1"
            />
          </div>
          <div className="font-semibold">Үнийн мэдээлэл</div>
          {Money.map((el, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                {el.label} : <span className="font-semibold">{el.value}₮</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white sticky bottom-0 w-full h-fit p-2 flex items-center justify-between px-[10%]">
        <button
          onClick={onClose}
          className="border border-gray-200 p-4 rounded-full"
        >
          <IoChevronBack />
        </button>
        <button
          className="mr-[30px] bg-black text-white py-2 px-4 rounded-lg"
          onClick={() => {}}
        >
          Такси дуудах
        </button>
      </div>
    </div>
  );
}

export default Drawerr;
