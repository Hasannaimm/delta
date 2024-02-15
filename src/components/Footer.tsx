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

const Footer = () => {
  const { isPending, error, data } = useQuery<ContactInfo>({
    refetchOnMount:false , 
    refetchOnWindowFocus:false,
    queryKey: ["footer"],
    queryFn: () => fetch(`${Url}/${en}/footers`).then((res) => res.json()),
  });

  if (isPending) {
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
    <footer
      className={`${flexing} mt-10 bg-[#2A2A2A] px-6 text-white Rubik w4 justify-between p-7`}
    >
      <div>
        <h1>LOGO</h1>
        <p className="text-[13px] text-gray-200 w4 w-[400px]">{data?.text}</p>
      </div>

      <div className="text-center flex flex-col gap-y-3 ">
        <h3>-Follow us-</h3>
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
      <div className={`${flexing} w-[400px]`}>
        {/* <h2>CustomerService</h2>
        <span>&nbsp;.&nbsp;</span>
        <h2>PrivacyPolicy</h2> */}
      </div>
 
    </footer>
  );
};

export default Footer;
