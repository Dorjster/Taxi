import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  title: string;
  price: number;
  description: string;
};

const SwiperDetail = (props: Props) => {
  const { image, title, price, description } = props;
  return (
    <div className="bg-[#F7F7F7] px-3 py-3 rounded-lg flex justify-between ">
      <div className="flex gap-[12px]">
        {" "}
        <div>
          <Image src={image} alt={title} width={80} height={80} />
        </div>
        <div className="mt-[10px]">
          <p className="font-bold text-[14px]">{title}</p>

          <p className="text-[12px] text-[#5C5C5C] absolute">{description}</p>
        </div>
      </div>

      <div className="font-medium text-[14px] mt-[10px]">{price}₮</div>
    </div>
  );
};

export default SwiperDetail;
