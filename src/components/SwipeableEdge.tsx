"use client";
import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SwiperDetail from "./SwiperDetail";
import { cabs, Delivery, Driver } from "./_db";
import SwipeableTemporaryDrawer from "./Swiper";

const drawerBleeding = 236;

interface Props {
  window?: () => Window;
}

export interface ItemData {
  image: string;
  title: string;
  description: string;
  price: number;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
  height: "calc(100% - 100px)",
  overflow: "hidden",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 80,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(43% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [openSecondDrawer, setOpenSecondDrawer] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<ItemData | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleSecondDrawer = (newOpen: boolean) => () => {
    setOpenSecondDrawer(newOpen);
  };

  const handleCall = (data: ItemData) => {
    setSelectedData(data);
    toggleSecondDrawer(true)();
    console.log(data);
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        className="h-[100vh]"
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          className=" h-[160%]"
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            visibility: "visible",
          }}
        >
          <Puller />

          <StyledBox
            sx={{
              px: 2,
              height: "100%",
              overflow: "auto",
              paddingY: "5%",
            }}
          >
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
          </StyledBox>
        </StyledBox>
        <SwipeableTemporaryDrawer
          open={openSecondDrawer}
          onClose={() => toggleSecondDrawer(false)()}
          data={selectedData as ItemData}
        />
      </SwipeableDrawer>
    </Root>
  );
}
