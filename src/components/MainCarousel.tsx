import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Button from "./Button";
import { Url, Url_img,  lng } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Category from "./SubCategory";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useTranslation } from "react-i18next";
type CarouselProps = {
  id: number;
  text: string;
  img_url: string;
  linkk: string;
};

const MainCarousel = () => {
  const { t } = useTranslation();
  const { isPending, error, data } = useQuery<CarouselProps[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["carousel"],
    queryFn: () => fetch(`${Url}/${lng}/headers`).then((res) => res.json()),
  });

  if (isPending) return null;
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
        swipeable={false}
        showThumbs={false}
        interval={3000}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-left z-10  "
            >
              <span className="arrow-left">
                <GrPrevious className="text-[#334774] text-[2.5rem]" />
              </span>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="custom-arrow custom-arrow-right z-10 "
            >
              <span className="arrow-right">
                <GrNext className="text-[#334774] text-[2.5rem]" />
              </span>
            </button>
          )
        }
      >
        {data.map((item, index) => {
          return (
            <div key={index} className="relative ">
              <img
                loading="lazy"
                src={`${Url_img}/${item?.img_url}`}
                className="h-[500px] max-sm:h-[300px] max-sm:object-cover"
              />
              {item?.linkk !== " " ? (
                <Button classes="absolute bottom-10 transfom left-[50%]   ">
                  <Link to={item?.linkk}>{t("discover")}</Link>
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
