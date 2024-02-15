import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, en } from "../hooks";
import { AdData, videoProps } from "../types";

const AdCampain = ({ ishome }: videoProps) => {
  const { isFetching, error, data } = useQuery<AdData | undefined>({
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    queryKey: ["vdad"],
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
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <section className="bg-[#f5f5f5] text-center m-14 p-8 rounded-3xl">
      <h1 className="text-black text-[2rem] w5 my-3 ">AD CAMPAIGN</h1>

      {data && (
        <video
          src={
            ishome
              ? `${Url_img}/${data?.home_ad?.url} `
              : `${Url_img}/${data?.category_ad?.url} `
          }
          controls
          className="w-[400px] h-[400px] max-w-md mx-auto shadow-lg rounded-lg object-cover"
        ></video>
      )}
    </section>
  );
};

export default AdCampain;
