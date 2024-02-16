import { useParams } from "react-router-dom";
import ArticleDescription from "../components/ArticleDescription";
import { useQuery } from "@tanstack/react-query";
import { Item, ProductProps, RandomProp } from "../types";
import { Url, Url_img, en } from "../hooks";
import ProductCard from "../components/ProductCard";
import CategoriesHero from "../components/CategoriesHero";
import Category from "../components/SubCategory";




const ProductPage = () => {
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
            instrunctions="Apply a small amount to the face morning and/or evening to thoroughly cleansed skin (face, neck, and neckline). Just a few drops are enough. Follow up the skincare by applying your lotion or cream. You may also mix the oil with the cream or the lotion."
            sizes={data?.item?.weight}
          />
        </article>
      </section>

      <article className="flex flex-col justify-center items-center mt-20 max-md:mt-2">
        <h1 className="m-7 text-[2rem]  w5 max-md:text-[1.7rem] ">
          Related Products
        </h1>
        <RandomProductList items={data?.random } />
      </article>
    </>
  );
};

const RandomProductList = ({ items }: { items?: RandomProp["random"] | Item[] }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8">
      {items?.map((item, index) => (
        <ProductCard
          key={index}
          image={`${Url_img}/${item.img_url}`}
          name={item.name}
          sub={item.description}
          catid={item.category_id}
          id={item.id}
        />
      ))}
    </div>
  );
};


export default ProductPage;
