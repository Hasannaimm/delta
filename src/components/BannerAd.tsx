import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, lng } from "../hooks";
import { AdData } from "../types";

const BannerAd = () => {
  const { isFetching, error, data } = useQuery<AdData>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["bad"],
    queryFn: () => fetch(`${Url}/${lng}/ads`).then((res) => res.json()),
  });

  if (isFetching) {
    return null;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center ">Network error</div>
    );
  }

  return (
    <div
      className={`w-[200px] h-[500px] max-md:hidden m-3 absolute top-1/4 left-14 cursor-pointer shadow-md ${
        data?.banner ? " " : "hidden"
      } `}
    >
      <div className="w-full h-full">
        {data && (
          <img
            src={`${Url_img}/${data?.banner?.url}`}
            alt={data?.banner?.location}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default BannerAd;
