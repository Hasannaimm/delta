import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, en } from "../hooks";
import { flexing } from "../utils";
import { useNavigate} from "react-router-dom";

type Item = {
  id: number;
  name: string;
  img_url: string;
  category_id: number;
  focus_row: number;
  focus_colm: number;
  focus_width: number;
};

type ItemSet = {
  items: Item[];
};

const MemoizedImage = React.memo(
  ({ src, alt }: { src: string; alt: string }) => (
    <img
      className="image"
      loading="lazy"
      src={`${Url_img}/${src}`}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  )
);

const MemoizedItem = React.memo(
  ({
    item,
    onItemClick,
  }: {
    item: Item;
    onItemClick: (itemId: number) => void;
  }) => {
    const handleClick = useCallback(() => {
      onItemClick(item.id);
    }, [item.id, onItemClick]);

    return (
      <div
        style={{
          display: "inline-block",
          margin: "8px",
          width: `${item.focus_width}%`,
          height: "300px",
          overflow: "hidden",
          position: "relative",
        }}
        className="cursor-pointer relative hover-div"
        onClick={handleClick}
      >
        <MemoizedImage src={item.img_url} alt={item.name} />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase transition text-lg w4  hover:text-black">
          {item.name}
        </p>
      </div>
    );
  }
);

const Hero = () => {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery<ItemSet[]>({
    queryKey: ["focusdata"],
    queryFn: () => fetch(`${Url}/${en}/focus`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="w-full flex justify-center my-9">
        <div className="loader flex justify-center items-center h-screen">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const handleItemClick = (itemId: number, category_id: number) => {
    // Handle item click logic here
    navigate(`${category_id}/${itemId}`);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-20 ml-14">
      <div style={{ width: "65%", margin: "auto" }} className="">
        {data && data.length > 0 ? (
          data.map((itemSet, setIndex) => (
            <div key={setIndex} className="flex">
              {itemSet?.items?.map((item) => (
                <MemoizedItem
                  key={item.id}
                  item={item}
                  onItemClick={() => handleItemClick(item.id, item.category_id)}
                />
              ))}
            </div>
          ))
        ) : (
          <div className={`${flexing}`}>
            <p className="w7">No data available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
