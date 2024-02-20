import { useQuery } from "@tanstack/react-query";
import AdCampain from "../components/AdCampain";
import CategoriesHero from "../components/CategoriesHero";
import { Url, Url_img, lng } from "../hooks";
import { CategoryItems } from "../types";
import { flexing } from "../utils";
import { useParams } from "react-router-dom";
import Category from "../components/SubCategory";
import CategorieItems from "../components/CategorieItems";

const CategoryPage = () => {
  let { catname } = useParams();

  const { isFetching, error, data } = useQuery<CategoryItems>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["categoryitems", catname],
    queryFn: () =>
      fetch(`${Url}/${lng}/filteritems/${catname}`).then((res) => res.json()),
  });

  if (isFetching) {
    return null;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      <CategoriesHero
        isabout={false}
        name={data?.category?.name}
        imageurl={`${Url_img}/${data?.category?.img_url}`}
      />
      <Category />
      <main className="w-full flex flex-col items-center ">
        <section className="flex flex-wrap justify-center items-center w-[70%] mt-10 ">
          {data && data.items.length > 0 ? (
            data?.items?.map((itemSet, setIndex) => (
              <CategorieItems
                id={itemSet.id}
                name={itemSet.name}
                key={setIndex}
                url={itemSet.img_url}
              />
            ))
          ) : (
            <div className={`${flexing}`}>
              <p className="w7">No data available</p>
            </div>
          )}
        </section>
        <div>dedfe</div>
      </main>

      <AdCampain ishome={false} />
    </>
  );
};

export default CategoryPage;
