import { useQuery } from "@tanstack/react-query";
import { ContactInfo } from "./Footer";
import { Url, en } from "../hooks";
import { whats } from "../assets";

const Whatsapp = () => {
  const { isPending, error, data } = useQuery<ContactInfo>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
    <a href={data?.whatsapp} target="_blank">
      <img
        src={whats}
        alt="whatsapp"
        className="fixed  bottom-[50px] right-6  h-11 w-11 cursor-pointer "
      />
    </a>
  );
};

export default Whatsapp;
