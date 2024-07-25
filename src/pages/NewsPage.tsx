import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { lng, Url, Url_img } from "../hooks";
import Loader from "../components/Loader";
import CategoriesHero from "../components/CategoriesHero";
import Category from "../components/SubCategory";

const NewsPage = () => {
  const { t } = useTranslation();
  const { isFetching, error, data } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["news"],
    queryFn: () => fetch(`${Url}/${lng}/news`).then((res) => res.json()),
  });

  const {
    isFetching: aboutft,
    error: abouter,
    data: aboutdt,
  } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["aboutus"],
    queryFn: () => fetch(`${Url}/${lng}/aboutus`).then((res) => res.json()),
    enabled: !!data, // Ensures this query only fetches when data is available
  });

  if (isFetching || aboutft) {
    return <Loader />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  if (abouter) {
    return <div>An error has occurred: {abouter.message}</div>;
  }

  return (
    <>
      <div className="bg-gray-100  ">
        <CategoriesHero
          imageurl={`${Url_img}/${aboutdt?.img_url}`}
          name={data?.title}
          isabout
        />
        <Category />
        <div className="flex justify-center items-center mt-16">
          <div className="p-6 bg-gray-100 min-h-screen Rubik w-[80%] ">
            <header className="flex flex-col md:flex-row md:items-center mb-8">
              <div className="md:w-1/3">
                <h1 className="text-4xl font-bold mb-4">News</h1>
                {/* <p className="text-sm text-gray-700">{t("blogd")}</p> */}
              </div>
            </header>
            <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-2  justify-items-">
              {
                //@ts-expect-error eror
                data.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={`/news/${item.id}`}
                      className="relative bg-cover bg-center h-72 shadow-md cursor-pointer"
                      style={{
                        backgroundImage: `url(${Url_img}/${item.img_url})`,
                      }}
                    >
                      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 rounded-bl-lg">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                      </div>
                    </a>
                  );
                })
              }
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
