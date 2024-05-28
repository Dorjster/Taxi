import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ItemData } from "./SwipeableEdge";
import SwiperDetail from "./SwiperDetail";
import { InputAdornment, TextField } from "@mui/material";
import { useAddressData } from "./Context/Address";
import Image from "next/image";
import { useRoadData } from "./Context/Road";
import { IoChevronBack } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import DiscreteSlider from "./Slider";
import { Money } from "./_db";

type Anchor = "bottom";

interface SwipeableTemporaryDrawerProps {
  open: boolean;
  onClose: () => void;
  data: ItemData;
}

export default function SwipeableTemporaryDrawer({
  open,
  onClose,
  data,
}: SwipeableTemporaryDrawerProps) {
  const { road } = useRoadData();
  const Puller = styled("div")(({ theme }) => ({
    width: 80,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(43% - 15px)",
  }));

  const { address } = useAddressData();
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        height: "100vh",
        marginBottom: "50px",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Puller />
      <SwiperDetail
        image={data?.image}
        title={data?.title}
        description={data?.description}
        price={data?.price}
      />

      <div>Очиж авах хаяг</div>
      <div className="bg-[#F7f7f7] px-[8px] py-[3px] rounded-[16px] flex gap-[8px] justify-between items-center ">
        <Image src="/Icon.svg" width={20} height={20} alt="Search Icon" />
        <TextField
          sx={{
            backgroundColor: "#F7F7F7",
            borderRadius: "16px",
            width: "100%",
            display: "flex",
            padding: "5px 15px",
          }}
          defaultValue={address?.display_name}
          id="input-with-icon-textfield"
          InputProps={{
            disableUnderline: true,
          }}
          variant="standard"
        />
      </div>

      {road.status === "Done" && (
        <div>
          {" "}
          <div>Хүргэх хаяг</div>
          <TextField
            sx={{
              backgroundColor: "#F7F7F7",
              borderRadius: "14px",
              width: "100%",
              display: "flex",
              paddingX: "5px",
              paddingY: "8px",
              mt: "8px",
              paddingRight: "20px",
            }}
            defaultValue={address?.go_name}
            id="input-with-icon-textfield"
            placeholder="Очих хаяг"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiLocationOn size={25} className="mr-2" />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            variant="standard"
          />
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
                Аяллын хугацаа :{" "}
                <span className="font-semibold">
                  {road.duration < 60
                    ? `${road.duration} сек`
                    : `${(road.duration / 60).toFixed(2)} мин`}
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
      <>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          {" "}
          <div>Хаягийн дэлгэрэнгүй (заавал биш)</div>
          <TextField
            sx={{
              borderRadius: "16px",
              width: "100%",
              display: "flex",
              border: "1px solid #f0f0f0",
              padding: "5px 15px",
            }}
            placeholder="Хаягийн дэлгэрэнгүй"
            id="input-with-icon-textfield"
            InputProps={{
              disableUnderline: true,
            }}
            variant="standard"
          />
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px] border border-gray-200 p-4 rounded-[16px]">
          <div>Жолоочийн урамшуулал</div>
          <div>
            <DiscreteSlider />
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
        <div className="bg-white fixed bottom-0 w-full h-fit p-2 flex  items-center justify-between px-[10%] ">
          <button
            onClick={onClose}
            className="border border-gray-200 p-4 rounded-full  "
          >
            <IoChevronBack />
          </button>
          <button
            className="mr-[30px]"
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              background: "black",
              color: "white",
            }}
          >
            Такси дуудах
          </button>
        </div>
      </>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      PaperProps={{
        sx: {
          height: "80vh",
          minHeight: "85vh",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingX: "24px",
          paddingY: "24px",
          overflow: "hidden",
        },
      }}
    >
      {list("bottom")}
    </SwipeableDrawer>
  );
}
