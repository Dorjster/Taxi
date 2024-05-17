// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import { styled } from "@mui/material/styles";
// import { grey } from "@mui/material/colors";
// import SwiperDetail from "./SwiperDetail";
// import { Typography } from "@mui/material";
// import SwipeableTemporaryDrawer from "./Swiper";
// import { cabs, Delivery, Driver } from "./_db";

// type Anchor = "bottom";

// const drawerBleeding = 100;

// export interface ItemData {
//   image: string;
//   title: string;
//   description: string;
//   price: number;
// }

// const CustomBox = styled(Box)(() => ({
//   // position: "absolute",

//   // top: -drawerBleeding,
//   visibility: "visible",

//   "&::-webkit-scrollbar": {
//     display: "none",
//   },
//   scrollbarWidth: "none",
// }));

// export default function SwipeableEdge() {
//   const [openSecondDrawer, setOpenSecondDrawer] = React.useState(false);
//   const [selectedData, setSelectedData] = React.useState<ItemData | null>(null);
//   const [state, setState] = React.useState({ bottom: false });

//   const toggleDrawer =
//     (anchor: Anchor, open: boolean) =>
//     (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event &&
//         event.type === "keydown" &&
//         ((event as React.KeyboardEvent).key === "Tab" ||
//           (event as React.KeyboardEvent).key === "Shift")
//       ) {
//         return;
//       }

//       setState({ ...state, [anchor]: open });
//     };

//   const Puller = styled("div")(({ theme }) => ({
//     width: 80,
//     height: 6,
//     backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[900],
//     borderRadius: 3,
//     position: "absolute",
//     top: 8,
//     left: "calc(50% - 40px)",
//   }));

//   const toggleSecondDrawer = (newOpen: boolean) => () => {
//     setOpenSecondDrawer(newOpen);
//   };

//   const handleCall = (data: ItemData) => {
//     setSelectedData(data);
//     toggleSecondDrawer(true)();
//     console.log(data);
//   };

//   const list = (anchor: Anchor) => (
//     <CustomBox
//       onClick={toggleDrawer(anchor, true)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <Puller />
//       <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
//         Такси үйлчилгээ
//       </Typography>
//       {cabs.map((cab, index) => (
//         <div
//           onClick={() => {
//             handleCall(cab);
//           }}
//           key={index}
//           className="mb-[10px] rounded-[10px] overflow-hidden "
//         >
//           <SwiperDetail
//             image={cab.image}
//             title={cab.title}
//             description={cab.description}
//             price={cab.price}
//           />
//         </div>
//       ))}
//       <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
//         Хүргэлт
//       </Typography>
//       {Delivery.map((delivery, index) => (
//         <div
//           onClick={() => {
//             handleCall(delivery);
//           }}
//           key={index}
//           className="mb-[10px] rounded-[10px] overflow-hidden "
//         >
//           <SwiperDetail
//             image={delivery.image}
//             title={delivery.title}
//             description={delivery.description}
//             price={delivery.price}
//           />
//         </div>
//       ))}
//       <Typography sx={{ paddingY: "8px", fontWeight: "550" }}>
//         Дуудлагын жолооч
//       </Typography>
//       {Driver.map((driver, index) => (
//         <div
//           onClick={() => {
//             handleCall(driver);
//           }}
//           key={index}
//           className="mb-[10px] rounded-[10px] overflow-hidden "
//         >
//           <SwiperDetail
//             image={driver.image}
//             title={driver.title}
//             description={driver.description}
//             price={driver.price}
//           />
//         </div>
//       ))}
//       <SwipeableTemporaryDrawer
//         open={openSecondDrawer}
//         onClose={toggleSecondDrawer(false)}
//         data={selectedData as ItemData}
//       />
//     </CustomBox>
//   );

//   return (
//     <SwipeableDrawer
//       anchor="bottom"
//       open={state.bottom}
//       onClose={toggleDrawer("bottom", false)}
//       onOpen={toggleDrawer("bottom", true)}
//       disableSwipeToOpen={false}
//       swipeAreaWidth={drawerBleeding}
//       ModalProps={{ keepMounted: true }}
//       PaperProps={{
//         sx: {},
//       }}
//     >
//       <CustomBox
//         sx={{
//           // position: "absolute",
//           paddingTop: `-${drawerBleeding}px`,
//           backgroundColor: "white",

//           visibility: "visible",
//         }}
//       >
//         {list("bottom")}
//       </CustomBox>
//     </SwipeableDrawer>
//   );
// }
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

const drawerBleeding = 206;

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
  width: "100vw",
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
        className="h-[100vh] w-[100vw]"
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
      >
        <StyledBox
          className=" h-[145%]"
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
              width: "100vw",
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
