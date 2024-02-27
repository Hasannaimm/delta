import { MainColor, flexing } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { CategoryProps } from "../types";
import { Url, lng } from "../hooks";
import cookies from "js-cookie";

const Category = () => {
  const { isPending, error, data } = useQuery<CategoryProps[]>({
    refetchOnWindowFocus: false,
    queryKey: ["repoData"],
    queryFn: () => fetch(`${Url}/${lng}/categories`).then((res) => res.json()),
  });

  if (isPending) return null;
  if (error) return "An error has occurred: " + error?.message;
  const currentLanguageCode = cookies.get("i18next") || "en";

  return (
    <section
      className={`${flexing} gap-8 text-white Rubik py-1 w4 text-sm relative max-md:hidden`}
      style={{ background: MainColor }}
    >
      <a className="hover:text-gray-200 p-2 text-md uppercase" href="/deltaagro">
       {currentLanguageCode=="en" ? "Home" :"Maison"}
      </a>
      {data?.map((item, index) => (
        <a
          key={index}
          className="hover:text-gray-200 p-2 text-md"
          href={`/deltaagro/${item?.id}`}
        >
          {item?.name}
        </a>
      ))}
    </section>
  );
};

export default Category;
