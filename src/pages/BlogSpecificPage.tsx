import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { lng, Url, Url_img } from "../hooks";
import { useQuery } from "@tanstack/react-query";
//@ts-ignore
import DOMPurify from "dompurify";
import CategoriesHero from "../components/CategoriesHero";
import Category from "../components/SubCategory";
const BlogSpecificPage = () => {
  const { id } = useParams();
  const { isFetching, error, data } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["blogs", id],
    queryFn: () => fetch(`${Url}/${lng}/blog/${id}`).then((res) => res.json()),
  });
  
  const {
    isFetching: aboutft,
    error: abouter,
    data: aboutdt
  } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["aboutus"],
    queryFn: () => fetch(`${Url}/${lng}/aboutus`).then((res) => res.json()),
    enabled: !!data, // Ensures this query only fetches when data is available
  });
  
  if (isFetching || aboutft) {
    return <Loader />;
  }
  
  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
  
  if (abouter) {
    return <div>An error has occurred: {abouter.message}</div>;
  }
  
  const sanitizedDescription = data
    ? DOMPurify.sanitize(data.description || "")
    : "";
  return (
    <>
      <CategoriesHero
        imageurl={`${Url_img}/${aboutdt?.img_url}`}
        name={data?.title}
        isabout
      />
      <Category />

      <section className="flex flex-col justify-center items-center mt-28">
        <div className="space-y-4 w-[90%] max-sm:w-full">
          <h1 className="text-[#334774]  w7 text-[2.3rem] ">{data?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </section>
    </>
  );
};

export default BlogSpecificPage;
