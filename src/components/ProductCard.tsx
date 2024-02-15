import React from "react";
import { ProductCardType } from "../types";
import { useNavigate } from "react-router-dom";

const ProductCard = React.memo(
  ({ image, name, sub, id, catid }: ProductCardType) => {
    const navigate = useNavigate();

    return (
      <div
        className="flex flex-col gap-y-3 justify-center items-center cursor-pointer"
        onClick={() => {
          navigate(`/${catid}/${id}`);
        }}
      >
        <img
          src={image}
          className="h-72 w-72 rounded-3xl"
          alt={name}
          loading="lazy"
        />
        <div className="flex flex-col justify-center items-center">
          <h2 className="w5 text-[15px] ">{name}</h2>
          <h5 className="w4 text-[12px] ">{sub}</h5>
        </div>
      </div>
    );
  }
);

export default ProductCard;
