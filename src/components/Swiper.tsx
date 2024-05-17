import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ItemData } from "./SwipeableEdge";
import SwiperDetail from "./SwiperDetail";
import { TextField } from "@mui/material";
import { useAddressData } from "./Context/Address";
import Image from "next/image";

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
        },
      }}
    >
      {list("bottom")}
    </SwipeableDrawer>
  );
}
