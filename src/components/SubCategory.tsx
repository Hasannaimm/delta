import { useState } from 'react';
import { MainColor, flexing } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { CategoryProps } from "../types";
import { Url, lng } from "../hooks";
import cookies from "js-cookie";

const Category = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isPending, error, data } = useQuery<CategoryProps[]>({
    refetchOnWindowFocus: false,
    queryKey: ["repoData"],
    queryFn: () => fetch(`${Url}/${lng}/categories`).then((res) => res.json()),
  });

  if (isPending) return null;
  if (error) return "An error has occurred: " + error?.message;
  const currentLanguageCode = cookies.get("i18next") || "en";

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <section
      className={`${flexing} gap-8 text-white Rubik py-1 w4 text-sm relative max-md:hidden`}
      style={{ background: MainColor }}
    >
      <a className="hover:text-gray-200 p-2 text-md uppercase" href="/">
        {currentLanguageCode == "en" ? "Home" : "Maison"}
      </a>
      <a
        href="/about-us"
        className="hover:text-gray-200 p-2 text-md uppercase"
        style={{ background: MainColor }}
      >
        {currentLanguageCode == "en" ? "About Us" : "À propos de nous"}
      </a>
      <a
        href="/contact-us"
        className="hover:text-gray-200 p-2 text-md uppercase"
      >
        {currentLanguageCode == "en" ? "Contact Us" : "Contactez-nous"}
      </a>
      <button 
        className="relative hover:text-gray-200 p-2 text-md uppercase"
        onClick={toggleDropdown}
      >
        {currentLanguageCode == "en" ? "Categories" : "Catégories"}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-[50%s] w-[500px] bg-white text-black mt-2 rounded-lg shadow-lg transition-transform transform scale-100 z-50">
          {data?.map((item, index) => (
            <a
              key={index}
              className="block hover:bg-gray-100 p-2 text-md border-b last:border-b-0"
              href={`/${item?.id}`}
            >
              {item?.name}
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Category;
