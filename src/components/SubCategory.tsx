import { MainColor, flexing } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { CategoryProps } from "../types";
import { Url, en } from "../hooks";

const Category = () => {
  const { isPending, error, data } = useQuery<CategoryProps[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["repoData"],
    queryFn: () => fetch(`${Url}/${en}/categories`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="w-full flex justify-center my-9">
        <div className="loader flex justify-center items-center h-screen">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </div>
    );
  if (error) return "An error has occurred: " + error?.message;

  return (
    <section
      className={`${flexing} gap-8 text-white Rubik py-1 w4 text-sm relative max-md:hidden`}
      style={{ background: MainColor }}
    >
      <a className="hover:text-gray-200 p-2 text-md uppercase" href="/">
        Home
      </a>
      {data?.map((item, index) => (
        <a
          key={index}
          className="hover:text-gray-200 p-2 text-md"
          href={`/${item?.id}`}
        >
          {item?.name}
        </a>
      ))}
    </section>
  );
};

export default Category;
