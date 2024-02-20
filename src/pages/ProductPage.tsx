import { useParams } from "react-router-dom";
import ArticleDescription from "../components/ArticleDescription";
import { useQuery } from "@tanstack/react-query";
import { Item, ProductProps, RandomProp } from "../types";
import { Url, Url_img, en } from "../hooks";
import ProductCard from "../components/ProductCard";
import CategoriesHero from "../components/CategoriesHero";
import Category from "../components/SubCategory";
import { useTranslation } from "react-i18next";

const ProductPage = () => {
  const { t} = useTranslation()
  let { productid } = useParams();

  const { isFetching, error, data } = useQuery<ProductProps>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["items", productid],
    queryFn: () =>
      fetch(`${Url}/${en}/getitem/${productid}`).then((res) => res.json()),
  });

  if (isFetching) {
    return (
      null
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  console.log(data);

  return (
    <>
      <CategoriesHero
        name={data?.category?.name}
        imageurl={`${Url_img}/${data?.category?.img_url}`}
        isabout={false}
      />
      <Category />
      <section className="flex justify-center items-center gap-x-16 mt-32 max-md:flex-col">
        <div>
          <img
            src={`${Url_img}/${data?.item?.img_url}`}
            alt={data?.item?.name}
            className="h-[400px] w-[400px] p-1"
          />
        </div>

        <article className=" max-md:max-w-[300px] w-[400px] space-y-1">
          <ArticleDescription
            name={data?.item?.name}
            subname={data?.item?.description}
            benefits={data?.item?.usagee}
            instrunctions={data?.item?.instruction}
            sizes={data?.item?.weight}
          />
        </article>
      </section>

      <article className="flex flex-col justify-center items-center mt-20 max-md:mt-2">
        <h1 className="m-7 text-[2rem]  w5 max-md:text-[1.7rem] ">
        {t("related")}
        </h1>
        <RandomProductList items={data?.random} />
      </article>
    </>
  );
};

const RandomProductList = ({ items }: { items?: RandomProp[] | Item[] }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8">
      {Array.isArray(items) &&
        items.map((item, index) => (
          <ProductCard
            key={index}
            image={`${Url_img}/${item.img_url}`}
            name={item.name || ""}
            sub={item.description}
            catid={item.category_id}
            id={item.id}
          />
        ))}
      {!Array.isArray(items) && <p>No related products available</p>}
    </div>
  );
};

export default ProductPage;
