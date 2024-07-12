import cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { flexing } from "../utils";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Url, en, lng} from "../hooks";
import { logo } from "../assets";
import { useTranslation } from "react-i18next";
import { ItemHome} from "../types";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate()
  const { isPending: isPendingFooter, error: footerError, data: footerData } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["footer"],
    queryFn: () => fetch(`${Url}/${en}/footers`).then((res) => res.json()),
  });

  const { isFetching: isFetchingProducts, error: productsError, data: productsData } = useQuery<ItemHome[]>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["homeitems"],
    queryFn: () => fetch(`${Url}/${lng}/homeitems`).then((res) => res.json()),
  });

  if (isPendingFooter || isFetchingProducts) {
    return null;
  }

  if (footerError) {
    return <div>An error has occurred: {footerError.message}</div>;
  }

  if (productsError) {
    return <div className="flex justify-center items-center">Network error</div>;
  }

  return (
    <>
      <footer
        className={`${flexing} mt-10 bg-[#2A2A2A] px-10 text-white Rubik w4 justify-between p-7 max-md:flex-col`}
      >
        <div>
          <img
            src={logo}
            height={100}
            width={100}
            className="max-md:h-[60px] max-md:w-[60px] cursor-pointer"
            alt="logo"
            onClick={()=>{
                navigate("/")
            }}
          />
          <p className="text-[13px] text-gray-200 w4 w-[400px] max-md:max-w-[310px]">
            {currentLanguageCode === "en" ? footerData?.text : footerData?.text_fr}
          </p>
        </div>

        <div className="text-center flex flex-col gap-y-3">
        <div className={`${flexing} max-w-[320px]`}>
          <a href="/privacy-policy" className="text-white">Privacy Policy</a>
        </div>
          <h3 className=" cursor-pointer"  onClick={()=>{
            navigate("/contact-us")
          }} >{t("followus")}</h3>
          <ul className={`${flexing} gap-x-4`}>
            {footerData?.whatsapp && (
              <li>
                <a href={footerData?.whatsapp} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-white h-6 w-6" />
                </a>
              </li>
            )}
            {footerData?.instagram && (
              <li>
                <a href={footerData?.instagram} target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram className="text-white h-6 w-6" />
                </a>
              </li>
            )}
            {footerData?.facebook && (
              <li>
                <a href={footerData?.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-white h-6 w-6" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="text-center flex flex-col gap-y-3">
  <h3 className="text-xl font-bold">- Our Products -</h3>
  <ul className="list-disc list-inside text-[13px] text-gray-200">
    {productsData?.map((item) => (
      <p key={item.id} className="w-full">
        <a
          href={`/product/${item.id}`}
          className="block w-full text-white hover:text-[#25e9cc] transition-colors duration-300"
        >
          {item.name}
        </a>
      </p>
    ))}
  </ul>
</div>


    
      </footer>

      <article className="bg-[#2A2A2A] flex justify-center items-center p-6">
        <p className="Rubik text-white text-xs">
          © 2024 powered by{" "}
          <a href="https://finovafintech.io/" className="text-[#25e9cc]">
            Finova FinTech.
          </a>
        </p>
      </article>
    </>
  );
};

export default Footer;
