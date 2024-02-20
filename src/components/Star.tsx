import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Url, Url_img, en } from "../hooks";
import { ItemHome } from "../types";
import { useTranslation } from "react-i18next";

const Star = () => {
  const { t } = useTranslation();
  const { isFetching, error, data } = useQuery<ItemHome[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["homeitems"],
    queryFn: () => fetch(`${Url}/${en}/homeitems`).then((res) => res.json()),
  });

  if (isFetching) {
    return (
     null    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center ">Network error</div>
    );
  }

  return (
    <section className={`flex  flex-col  justify-center items-center mt-10 `}>
      <h1 className="m-5 text-[2rem]  w5">{t("favorite")}</h1>
      <div className="flex justify-center flex-wrap gap-10">
        {data?.map((item) => (
          <ProductCard
            image={`${Url_img}/${item?.img_url}`}
            name={item?.name}
            sub={item?.category?.name}
            key={item?.id}
            catid={item?.category_id}
            id={item?.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Star;
