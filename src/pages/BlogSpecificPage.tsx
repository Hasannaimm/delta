import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { lng, Url } from "../hooks";
import { useQuery } from "@tanstack/react-query";
//@ts-ignore
import DOMPurify from "dompurify";
const BlogSpecificPage = () => {
  const { id } = useParams();
  const { isFetching, error, data } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["blogs", id],
    queryFn: () => fetch(`${Url}/${lng}/blog/${id}`).then((res) => res.json()),
  });
  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  const sanitizedDescription = data
    ? DOMPurify.sanitize(data.description || "")
    : "";

  return <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />;
};

export default BlogSpecificPage;
