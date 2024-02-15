import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Button from "./Button";
import { Url, Url_img, en } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Category from "./SubCategory";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
type CarouselProps = {
  id: number;
  text: string;
  img_url: string;
  linkk: string;
};

const MainCarousel = () => {
  const { isPending, error, data } = useQuery<CarouselProps[]>({
    queryKey: ["carousel"],
    queryFn: () => fetch(`${Url}/${en}/headers`).then((res) => res.json()),
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

  return (
    <div>
      <Carousel
        autoPlay
        autoFocus
        infiniteLoop
        className=""
        showStatus={false}
      
        showIndicators={false}
        stopOnHover
        showThumbs={false}
        interval={3000}
        swipeable={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-left z-10  "
            >
              <span className="arrow-left"><GrPrevious  className="text-[#056df5] text-[2.5rem]"/></span>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-right z-10"
            >
              <span className="arrow-right"><GrNext  className="text-[#056df5] text-[2.5rem]"/></span>
            </button>
          )
        }
      >
        {data.map((item, index) => {
          return (
            <div key={index} className="relative">
              <img
                loading="lazy"
                src={`${Url_img}/${item?.img_url}`}
                className="h-[500px] "
              />
              {item?.linkk !== " " ? (
                <Button classes="absolute bottom-10 transfom left-[50%]   ">
                  <Link to={item?.linkk}>Discover More</Link>
                </Button>
              ) : null}
            </div>
          );
        })}
      </Carousel>
      <Category />
    </div>
  );
};

export default MainCarousel;
