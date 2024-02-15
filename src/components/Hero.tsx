import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, en } from "../hooks";
import { flexing } from "../utils";
import { useNavigate } from "react-router-dom";

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

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handler);
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

const Image = ({ src, alt, isMaxMd }: { src: string; alt: string; isMaxMd: boolean }) => (
  <img
    loading="lazy"
    src={`${Url_img}/${src}`}
    alt={alt}
    style={{
      width: isMaxMd ? "100%" : "100%",
      height: "100%",
      objectFit: "cover",
    }}
    className="image "
  />
);

const Item = ({
  item,
  onItemClick,
}: {
  item: Item;
  onItemClick: (itemId: number) => void;
}) => {
  const handleClick = useCallback(() => {
    onItemClick(item.id);
  }, [item.id, onItemClick]);

  const isMaxMd = useMediaQuery("(max-width: 768px)");

  // Adjust the image width calculation for better responsiveness
  const imageWidth = isMaxMd ? "100%" : "50%"; // You can adjust this value based on your design

  return (
    <div
      style={{
        display: "inline-block",
        margin: "8px",
        width: imageWidth,
        height: "300px",
        overflow: "hidden",
        position: "relative",
      }}
      className="cursor-pointer relative hover-div"
      onClick={handleClick}
    >
      <Image src={item.img_url} alt={item.name} isMaxMd={isMaxMd} />
      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase transition text-lg w4  hover:text-black">
        {item.name}
      </p>
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery<ItemSet[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
    navigate(`${category_id}/${itemId}`);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-20 ">
      <div style={{ maxWidth: '1200px', margin: "auto" }} className="">
        {data && data.length > 0 ? (
          data.map((itemSet, setIndex) => (
            <div key={setIndex} className="flex max-md:flex-col">
              {itemSet?.items?.map((item) => (
                <Item
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
