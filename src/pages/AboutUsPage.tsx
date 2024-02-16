import { useQuery } from "@tanstack/react-query";
import { Url, Url_img, en } from "../hooks";
import { aboutUsProps } from "../types";
import CategoriesHero from "../components/CategoriesHero";

//@ts-ignore
import DOMPurify from "dompurify";
import Category from "../components/SubCategory";

const AboutUsPage = () => {
  const { isFetching, error, data } = useQuery<aboutUsProps>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["aboutus"],
    queryFn: () => fetch(`${Url}/${en}/aboutus`).then((res) => res.json()),
  });

  if (isFetching) {
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

  console.log(data);
  const sanitizedDescription = data
    ? DOMPurify.sanitize(data.description || "")
    : "";

  return (
    <>
      <CategoriesHero
        imageurl={`${Url_img}/${data?.img_url}`}
        name={data?.title}
        isabout
      />
      <Category/>

      <section className="flex flex-col justify-center items-center mt-28">
        <div className="text-center space-y-4 w-[90%]">
          <h1 className="text-[#334774]  w7 text-[2.3rem] ">{data?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
