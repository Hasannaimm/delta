// types.ts

export interface ContactInfo {
  text: string;
  text_fr: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
}

// Footer.tsx

import { useQuery } from "@tanstack/react-query";
import { flexing } from "../utils";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { Url, en } from "../hooks";
import { logo } from "../assets";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} =useTranslation()
  const { isPending, error, data } = useQuery<ContactInfo>({
    refetchOnMount:false , 
    refetchOnWindowFocus:false,
    queryKey: ["footer"],
    queryFn: () => fetch(`${Url}/${en}/footers`).then((res) => res.json()),
  });

  if (isPending) {
    return (
     null
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <footer
      className={`${flexing} mt-10 bg-[#2A2A2A] px-6 text-white Rubik w4 justify-between p-7 max-md:flex-col`}
    >
      <div>
      <img
              src={logo}
              height={100}
              width={100}
              className="max-md:h-[60px] max-md:w-[60px] "
              alt="logo"
            />
        <p className="text-[13px] text-gray-200 w4 w-[400px] max-md:max-w-[310px] ">{data?.text}</p>
      </div>

      <div className="text-center flex flex-col gap-y-3 ">
        <h3>-{t("followus")}-</h3>
        <ul className={`${flexing} gap-x-4`}>
          {data?.whatsapp && (
            <li>
              <a href={data?.whatsapp} target="_blank">
                <FaWhatsapp className="text-white h-6 w-6" />
              </a>
            </li>
          )}
          {data?.instagram && (
            <li>
              <a href={data?.instagram} target="_blank">
                <AiFillInstagram className="text-white h-6 w-6" />
              </a>
            </li>
          )}
          {data?.facebook && (
            <li>
              <a href={data?.facebook} target="_blank">
                <FaFacebookF className="text-white h-6 w-6" />
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className={`${flexing} max-w-[320px]`}>
        {/* <h2>CustomerService</h2>
        <span>&nbsp;.&nbsp;</span>
        <h2>PrivacyPolicy</h2> */}
      </div>
 
    </footer>
  );
};

export default Footer;
