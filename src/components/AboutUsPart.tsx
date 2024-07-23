import { useQuery } from "@tanstack/react-query";
import { lng, Url } from "../hooks";
import { Counter } from "./Counter";
import { SlEnergy } from "react-icons/sl";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { TbWorldStar } from "react-icons/tb";
import { TbBrandItch } from "react-icons/tb";

const AboutUsPart = () => {
  const { isPending, error, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["homeabouts"],
    queryFn: () => fetch(`${Url}/${lng}/figures`).then((res) => res.json()),
  });

  if (isPending) return null;
  if (error) return "An error has occurred: " + error?.message;
  const currentYear = new Date().getFullYear();
  const yearsOfService = currentYear - 2008;
  
  return (
    <div className="bg-[#0c0c0d]   w-full p-24 flex flex-col justify-center items-center">
      <div className="text-white mb-8 flex flex-col justify-center items-center">
        <h1 className="Rubik text-5xl w5">About Us</h1>
        <p>OUR KEY FIGURES</p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-16">
        <Counter
          from={0}
          to={yearsOfService}
          text={"YEARS AT YOUR SERVICE"}
          icon={<SlEnergy size={40} />}
        />

        <Counter
          from={0}
          to={parseInt(data?.trust_us)}
          text={"CUSTOMERS TRUST US"}
          icon={<VscWorkspaceTrusted size={40} />}
        />

        <Counter
          from={0}
          to={parseInt(data?.countries)}
          text={"COUNTRIES REPRESENT US"}
          icon={<TbWorldStar size={40} />}
        />

        <Counter
          from={0}
          to={parseInt(data?.brands)}
          text={"BRANDS"}
          icon={<TbBrandItch size={40} />}
        />
      </div>
    </div>
  );
};

export default AboutUsPart;
