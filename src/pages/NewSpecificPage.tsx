import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { lng, Url, Url_img } from "../hooks";
import { useQuery } from "@tanstack/react-query";
//@ts-ignore
import DOMPurify from "dompurify";
import CategoriesHero from "../components/CategoriesHero";
import Category from "../components/SubCategory";
import { useState } from "react";
import axios from "axios";
const NewSpecificPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [sender, setError] = useState(false);
  const { isFetching, error, data } = useQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["new", id],
    queryFn: () => fetch(`${Url}/${lng}/news/${id}`).then((res) => res.json()),
  });

  const {
    isFetching: aboutft,
    error: abouter,
    data: aboutdt,
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
  const handleAddComment = async () => {
    try {
      const newComment = {
        name,
        email,
        comment,
        website,
        news_id: id,
      };
      const reponse = await axios.post(
        `https://deltaagrogh.com/admincms/api/newscomment`,
        {
          ...newComment,
        }
      );
      if (reponse.data) {
        alert("Comment sent successfully");
        setName("");
        setEmail("");
        setComment("");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } finally {
    }
  };

  return (
    <>
      <CategoriesHero
        imageurl={`${Url_img}/${aboutdt?.img_url}`}
        name={data?.title}
        isabout
      />
      <Category />

      <section className="flex flex-col justify-center items-center mt-28">
        <div className="space-y-4 w-[90%]">
          <h1 className="text-[#334774]  w7 text-[2.3rem] ">{data?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mt-28">
        <h1 className="text-2xl">Comments</h1>
        {/* Display comments */}
        <div className="w-full max-w-full mt-4 px-16 max-sm:px-1  ">
          {data?.comments?.length > 0 ? (
            //@ts-expect-error error
            data.comments.map((comment) => (
              <div key={comment.id} className="border p-4 mb-4">
                <p className="font-bold">
                  {comment.name} ({comment.email})
                </p>
                {comment.website && (
                  <a
                    href={comment.website}
                    className="text-sm text-blue-950"
                    target="_blank"
                  >
                    {comment.website}
                  </a>
                )}
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <div className="w-full max-w-full px-16 mt-8 Rubik  max-sm:px-1 ">
          <h1 className="text-4xl py-5">Leave a comment</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={` w-full border p-2 ${
                sender && name == "" ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border p-2 ${
                sender && email == "" ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Comment*</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full border p-2 ${
                sender && comment == "" ? "border-red-500" : ""
              }`}
            />
          </div>
          <button
            onClick={handleAddComment}
            className="bg-[#b2c83f] text-white p-2 "
          >
            Add Comment
          </button>
        </div>
      </section>
    </>
  );
};
export default NewSpecificPage;
