import { Link } from "react-router-dom";
import { MainColor, flexing } from "../utils";
import Search from "./Search";
import { logo } from "../assets";
import { BsList } from "react-icons/bs";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CategoryProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Url, en } from "../hooks";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  // const languages = [
  //   {
  //     code: "fr",
  //     name: "Français",
  //     country_code: "fr",
  //   },
  //   {
  //     code: "en",
  //     name: "English",
  //     country_code: "gb",
  //   },
  // ];

  const currentLanguageCode = cookies.get("i18next") || "en";
  //const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const setLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    cookies.set("i18next", newLang);
  };

  const handleLanguageChange = () => {
    const newLang = currentLanguageCode === "fr" ? "en" : "fr";
    setLanguage(newLang);
  };

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

  console.log(currentLanguageCode);

  return (
    <>
      <section
        className={`${flexing} justify-between px-8 py-7 Rubik w5 relative `}
      >
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoCloseSharp className="text-[2rem] text-[#334774] " />
          ) : (
            <BsList className="text-[2rem] text-[#334774] " />
          )}
        </div>

        <ul className={`${flexing} text-[13px] gap-x-4 max-md:hidden `}>
          <li>
            <a href="/about-us">{t("about")}</a>
          </li>
        </ul>

        <div className="">
          <Link
            to={"/"}
            className="uppercase  w7"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <img
              src={logo}
              height={100}
              width={100}
              className="max-md:h-[60px] max-md:w-[60px] "
              alt="logo"
            />
          </Link>
        </div>

        <div className={`${flexing} gap-x-10 max-md:hidden`}>
          <div className="p-1 flex flex-col gap-y-2">
            <button className={`flex justify-end mr-2`}>
              <h1
                style={{ color: MainColor }}
                className="text-lg w7"
                onClick={handleLanguageChange}
              >
                {t("language")}
              </h1>
            </button>

            <Search />
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={` absolute top-[100%] left-0 w-[80%] h-svh bg-white z-50 flex flex-col gap-y-20 px-10 md:hidden transition-opacity ease-in-out duration-300 `}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="menu-items flex flex-col opacity-100 my-10">
              {data?.map((item, index) => (
                <a
                  key={index}
                  className="hover:text-gray-200 p-2 text-md border border-[#334774] m-1"
                  href={`/${item?.id}`}
                >
                  {item?.name}
                </a>
              ))}
            </div>

            {/* Your menu content goes here */}
            <ul className={`${flexing} text-[13px] gap-x-4 flex-col gap-3`}>
              <li>
                <button className={`flex justify-end mr-2`}>
                  <h1
                    style={{ color: MainColor }}
                    className="text-lg w7"
                    onClick={handleLanguageChange}
                  >
                    {t("language")}
                  </h1>
                </button>
              </li>
              <li>
                <a href="/about-us">AboutUS</a>
              </li>
            </ul>
          </div>
        )}
      </section>
      <div className="w-full justify-center items-center p-4 md:hidden">
        <Search />
      </div>
    </>
  );
};

export default Header;
