import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, lng } from "../hooks";
import { AdData, videoProps } from "../types";
import { useTranslation } from "react-i18next";

const AdCampain = ({ ishome }: videoProps) => {
  const { t } = useTranslation();
  const { isFetching, error, data } = useQuery<AdData | undefined>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["vdad"],
    queryFn: () => fetch(`${Url}/${lng}/ads`).then((res) => res.json()),
  });

  if (isFetching) {
    return null;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <section className=" text-center m-14 p-8 rounded-3xl">
      <h1 className="text-black text-[2rem] w5 my-3  ">{t("ad")}</h1>

      {data && (
        <video
          src={
            ishome
              ? `${Url_img}/${data?.home_ad?.url} `
              : `${Url_img}/${data?.category_ad?.url} `
          }
          controls
          className="w-[400px]  h-[300px] max-md:h-[250px]  mx-auto shadow-lg rounded-lg object-cover"
        ></video>
      )}
    </section>
  );
};

export default AdCampain;
