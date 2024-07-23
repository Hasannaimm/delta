import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { lng, Url, Url_img } from "../hooks";
import Loader from "../components/Loader";

const BlogPage = () => {
  const { t } = useTranslation();
  const { isFetching, error, data } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["blogs"],
    queryFn: () => fetch(`${Url}/${lng}/blogs`).then((res) => res.json()),
  });
  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen Rubik ">
      <header className="flex flex-col md:flex-row md:items-center mb-8">
        <div className="md:w-1/3">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-sm text-gray-700">{t("blogd")}</p>
        </div>
      </header>
      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3  justify-items-">
        {
            //@ts-expect-error eror
            data.map((item , index) =>{
                return (
                    <a
                    key={index}
                    href={`/blog/${item.id}`}
                    className="relative bg-cover bg-center h-64 rounded-lg shadow-md cursor-pointer"
                    style={{ backgroundImage: `url(${Url_img}/${item.img_url})` }}
                  >
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 rounded-bl-lg">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                    </div>
                  </a>
          
                )
            })
        }
    
     
      </main>
    </div>
  );
};

export default BlogPage;
