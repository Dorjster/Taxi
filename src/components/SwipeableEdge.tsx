"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import SwiperDetail from "./SwiperDetail";
import { Typography } from "@mui/material";
import { useAddressData } from "./Context/Address";
import SwipeableTemporaryDrawer from "./Swiper";
import { cabs, Delivery, Driver } from "./_db";

type Anchor = "bottom";

export interface ItemData {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function SwipeableEdge() {
  const [openSecondDrawer, setOpenSecondDrawer] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<ItemData | null>(null);
  const [state, setState] = React.useState({ bottom: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const Puller = styled("div")(({ theme }) => ({
    width: 80,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 40px)",
  }));

  const { address } = useAddressData();

  const toggleSecondDrawer = (newOpen: boolean) => () => {
    setOpenSecondDrawer(newOpen);
  };

  const handleCall = (data: ItemData) => {
    setSelectedData(data);
    toggleSecondDrawer(true)();
    console.log(data);
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        height: "fit",
      }}
    >
      <Puller />
      <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
        Такси үйлчилгээ
      </Typography>
      {cabs.map((cab, index) => (
        <div
          onClick={() => {
            handleCall(cab);
          }}
          key={index}
          className="mb-[10px] rounded-[10px] overflow-hidden "
        >
          <SwiperDetail
            image={cab.image}
            title={cab.title}
            description={cab.description}
            price={cab.price}
          />
        </div>
      ))}
      <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
        Хүргэлт
      </Typography>
      {Delivery.map((delivery, index) => (
        <div
          onClick={() => {
            handleCall(delivery);
          }}
          key={index}
          className="mb-[10px] rounded-[10px] overflow-hidden "
        >
          <SwiperDetail
            image={delivery.image}
            title={delivery.title}
            description={delivery.description}
            price={delivery.price}
          />
        </div>
      ))}
      <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
        Дуудлагын жолооч
      </Typography>
      {Driver.map((driver, index) => (
        <div
          onClick={() => {
            handleCall(driver);
          }}
          key={index}
          className="mb-[10px] rounded-[10px] overflow-hidden "
        >
          <SwiperDetail
            image={driver.image}
            title={driver.title}
            description={driver.description}
            price={driver.price}
          />
        </div>
      ))}
      <SwipeableTemporaryDrawer
        open={openSecondDrawer}
        onClose={toggleSecondDrawer(false)}
        data={selectedData as ItemData}
      />
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={state.bottom}
      onClose={toggleDrawer("bottom", false)}
      onOpen={toggleDrawer("bottom", true)}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingX: "24px",
          paddingY: "24px",
        },
      }}
    >
      {list("bottom")}
    </SwipeableDrawer>
  );
}
