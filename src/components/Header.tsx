import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsList } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import cookies from "js-cookie";
import { MainColor, flexing } from "../utils";
import { Url, lng } from "../hooks";
import { logo } from "../assets";
import Search from "./Search";
import Loader from "./Loader";
import { CategoryProps } from "../types";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const navigation = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const setLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    cookies.set("i18next", newLang);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    navigation("/");
    window.location.reload();
  };

  const { isPending, error, data } = useQuery<CategoryProps[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["repoData"],
    queryFn: () => fetch(`${Url}/${lng}/categories`).then((res) => res.json()),
  });

  if (isPending) return <Loader />;
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      <section
        className={`${flexing} justify-between px-8  Rubik w5 relative mb-3 `}
      >
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoCloseSharp className="text-[2rem] text-[#8fbc8f] " />
          ) : (
            <BsList className="text-[2rem] text-[#8fbc8f] " />
          )}
        </div>

        <ul
          className={`${flexing} text-[13px] gap-x-4 max-md:hidden  w-[220px]`}
        >
          <li></li>
        </ul>

        <div className="">
          <Link
            to={"/"}
            className="uppercase  w7 flex flex-col justify-center items-center max-sm:flex-col"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              height={180}
              width={180}
              className="max-md:h-[80px] max-md:w-[80px] "
              alt="logo"
            />
            <div className="flex flex-col justify-center items-center text-[#000000af] md:-mt-6 ">
              <h1 className="w7 text-4xl max-sm:text-lg">Delta</h1>
              <p className="uppercase w6 text-xs">agro limited</p>
            </div>
          </Link>
        </div>

        <div className={`${flexing} gap-x-10 max-md:hidden`}>
          <div className="p-1 flex flex-col gap-y-2">
            <div className="flex justify-end items-center">
              <button
                className={`flex justify-end mr-2`}
                onClick={() => handleLanguageChange("en")}
              >
                <h1
                  style={{
                    color: currentLanguageCode === "en" ? MainColor : "#636363",
                  }}
                  className="text-lg w7"
                >
                  EN
                </h1>
              </button>
              <button
                className={`flex justify-end mr-2`}
                onClick={() => handleLanguageChange("fr")}
              >
                <h1
                  style={{
                    color: currentLanguageCode === "fr" ? MainColor : "#636363",
                  }}
                  className="text-lg w7"
                >
                  FR
                </h1>
              </button>
            </div>

            <Search />
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={` absolute top-[100%] left-0 w-[80%] h-svh bg-white z-50 flex flex-col gap-y-20 px-10 md:hidden transition-opacity ease-in-out duration-300 `}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="menu-items flex flex-col opacity-100 my-10">
              <a
                className="hover:text-gray-200 p-2 text-md border border-[#334774] m-1"
                href="/"
              >
                {t("home")}
              </a>
              <a
                href="/about-us"
                className="hover:text-gray-200 p-2 text-md border border-[#334774] m-1"
              >
                {t("about")}
              </a>
              {data?.map((item, index) => (
                <Link
                  key={index}
                  className="hover:text-gray-200 p-2 text-md border border-[#334774] m-1"
                  to={`/${item?.id}`}
                >
                  {item?.name}
                </Link>
              ))}
            </div>

            <ul className={`${flexing} text-[13px] gap-x-4 flex-col gap-3`}>
              <div className="flex flex-col justify-end items-center">
                <button
                  className={`flex justify-end mr-2`}
                  onClick={() => handleLanguageChange("en")}
                >
                  <h1
                    style={{
                      color:
                        currentLanguageCode === "en" ? MainColor : "#636363",
                    }}
                    className="text-lg w7"
                  >
                    EN
                  </h1>
                </button>
                <button
                  className={`flex justify-end mr-2`}
                  onClick={() => handleLanguageChange("fr")}
                >
                  <h1
                    style={{
                      color:
                        currentLanguageCode === "fr" ? MainColor : "#636363",
                    }}
                    className="text-lg w7"
                  >
                    FR
                  </h1>
                </button>
              </div>
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
