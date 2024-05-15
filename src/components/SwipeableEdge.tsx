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
    description: "Олуулаа, 4-с дээш хүний суудалтай",
  },
];

const Delivery = [
  {
    image: "/List-Car.png",
    title: "Гараас гарт",
    price: 5000,
    desc: "Найдвартай баталгаатай, хурдтай",
  },
];

const Driver = [
  {
    image: "/List-Car-2.png",
    title: "Дуудлагын жолооч",
    price: 25000,
    desc: "Дуудлагын жолооч",
  },
];

const drawerBleeding = 286;

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
  //   height: "full",
}));

const Puller = styled("div")(({ theme }) => ({
  width: 80,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(44% - 15px)",
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
            height: `calc(85% - ${drawerBleeding}px)`,
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
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            visibility: "visible",
            right: 0,
            left: 0,
            paddingX: "20px",
            paddingY: "25px",
            // height: "500px",
            // marginTop: "50px",
            // backgroundColor: "white",
          }}
        >
          <Puller />
          {cabs.map(({ image, title, description, price }, index) => (
            <div
              key={index}
              className="mb-[30px] rounded-[10px] overflow-hidden "
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
        <StyledBox
          sx={{
            backgroundColor: "white",
            px: 2,
            pb: 2,
            height: "100%",
            // overflow: "auto",
          }}
        ></StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
