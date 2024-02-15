import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, en } from "../hooks";
import { AdData } from "../types";

const BannerAd = () => {
  const { isFetching, error, data } = useQuery<AdData>({
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    queryKey: ["bad"],
    queryFn: () => fetch(`${Url}/${en}/ads`).then((res) => res.json()),
   
  });

  if (isFetching) {
    return (
      <div className="w-full flex justify-center my-9">
        <div className="loader flex justify-center items-center h-screen">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center ">Network error</div>;
  }

  return (
    <div
      className={`w-[200px] h-[500px] m-3 absolute top-1/4 left-14 cursor-pointer shadow-md ${
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
