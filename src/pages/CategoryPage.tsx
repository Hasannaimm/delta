import { useQuery } from "@tanstack/react-query";
import AdCampain from "../components/AdCampain";
import CategoriesHero from "../components/CategoriesHero";
import { Url, Url_img, en } from "../hooks";
import { CategoryItems } from "../types";
import { flexing } from "../utils";
import { Link, useParams } from "react-router-dom";
import Category from "../components/SubCategory";

const CategoryPage = () => {
  let { catname } = useParams();

  const { isFetching, error, data } = useQuery<CategoryItems>({
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    queryKey: ["categoryitems", catname],
    queryFn: () =>
      fetch(`${Url}/${en}/filteritems/${catname}`).then((res) => res.json()),
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
      />
      <Category/>
      <main className="w-full flex flex-col items-center ">
        <section className="flex flex-wrap justify-center items-center w-[70%] mt-10 ">
          {data && data.items.length > 0 ? (
            data?.items?.map((itemSet, setIndex) => (
              <Link to={String(itemSet?.id)}>            
              <div className="m-3 " key={setIndex}>
                <div
                  key={itemSet?.id}
                  style={{
                    display: "inline-block",
                    margin: "8px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  className="cursor-pointer relative hover-div  w-[300px] h-[300px]  "
                >
                  <img
                    className="image"
                    src={`${Url_img}/${itemSet?.img_url}`}
                    alt={itemSet?.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase transition text-lg w4  hover:text-black">
                    {itemSet?.name}
                  </p>
                </div>
              </div>
              </Link>
            ))
          ) : (
            <div className={`${flexing}`}>
              <p className="w7">No data available</p>
            </div>
          )}
        </section>
      </main>

      <AdCampain ishome={false} />
    </>
  );
};

export default CategoryPage;
