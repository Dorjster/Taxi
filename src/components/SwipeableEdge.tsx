"use client";
import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { title } from "process";
import SwiperDetail from "./SwiperDetail";
import Image from "next/image";

type Cabs = {
  image: string;
  title: string;
  price: number;
  description: string;
};

const cabs = [
  {
    image: "/List-Car.png",
    title: "LetsCab",
    price: 1500,
    description: "Илүү хүртээмжтэй",
  },
  {
    image: "/List-Car-2.png",
    title: "Стандарт",
    price: 1500,
    description: "1-р эгнээгээр зорчдог",
  },
  {
    image: "/List-Car-3.png",
    title: "Вип",
    price: 3500,
    description: "Ая тухтай",
  },
  {
    image: "/List-Car.png",
    title: "Minivan",
    price: 3500,
    description: `Олуулаа,4-с дээш хүний суудалтай`,
  },
];

const Delivery = [
  {
    image: "/List-Car.png",
    title: "Гараас гарт",
    price: 5000,
    description: "Найдвартай баталгаатай, хурдтай",
  },
];

const Driver = [
  {
    image: "/List-Car-2.png",
    title: "Дуудлагын жолооч",
    price: 25000,
    description: "Дуудлагын жолооч",
  },
];

const drawerBleeding = 236;

interface Props {
  window?: () => Window;
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
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(43% - 15px)",
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
      {/* <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        onClick={toggleDrawer(true)}
        // container={container}
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
          className=" h-[160%]  "
          sx={{
            position: "absolute",

            top: -drawerBleeding,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            visibility: "visible",

            // paddingX: "20px",
          }}
        >
          <Puller />

          <StyledBox
            sx={{
              // position: "absolute",
              px: 2,

              height: "100%",
              overflow: "auto",
              // overflowY: "scroll",
              paddingY: "5%",
            }}
          >
            {" "}
            <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
              Такси үйлчилгээ
            </Typography>
            {cabs.map(({ image, title, description, price }, index) => (
              <div
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden "
              >
                {" "}
                <SwiperDetail
                  image={image}
                  title={title}
                  description={description}
                  price={price}
                />
              </div>
            ))}
            <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
              Хүргэлт
            </Typography>
            {Delivery.map(({ image, title, description, price }, index) => (
              <div
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden "
              >
                {" "}
                <SwiperDetail
                  image={image}
                  title={title}
                  description={description}
                  price={price}
                />
              </div>
            ))}
            <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
              Дуудлагын жолооч
            </Typography>
            {Driver.map(({ image, title, description, price }, index) => (
              <div
                key={index}
                className="mb-[10px] rounded-[10px] overflow-hidden "
              >
                {" "}
                <SwiperDetail
                  image={image}
                  title={title}
                  description={description}
                  price={price}
                />
              </div>
            ))}
          </StyledBox>
        </StyledBox>
        {/*  */}
      </SwipeableDrawer>
    </Root>
  );
}
