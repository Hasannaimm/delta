import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Url, Url_img, lng } from "../hooks";
import MainCarousel from "../components/MainCarousel";
import { GrNext, GrPrevious } from "react-icons/gr";
import AdCampain from "../components/AdCampain";
import { flexing } from "../utils";
import axios from "axios";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";

// Define TypeScript types
interface Item {
  id: number;
  name: string;
  img_url: string;
  category_id: number;
}

interface SearchData {
  items: Item[];
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

const SearchPage: React.FC = () => {
  const { productname } = useParams<{ productname?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { t } = useTranslation(); // Move useTranslation outside the return statement

  const mutation = useMutation({
    mutationFn: (searchTerm: string) => {
      return axios.post(`${Url}/${lng}/searchitem`, {
        search: searchTerm,
        page: currentPage,
      });
    },
  });

  useEffect(() => {
    // Check if productname exists before making a post request
    if (productname) {
      // Ensure that mutation.isSuccess is true before re-fetching
      if (mutation.isSuccess) {
        mutation.mutate(productname);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productname, mutation.isSuccess]);

  const { isFetching, error, data } = useQuery<SearchData>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["search", productname, currentPage],
    queryFn: () =>
      fetch(`${Url}/${lng}/searchitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: productname, page: currentPage }),
      }).then((res) => res.json()),
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <>
      <MainCarousel />

      <main className="w-full flex flex-col items-center">
        <section className="flex flex-wrap justify-center items-center w-[70%] mt-10">
          {data && data.items.length > 0 ? (
            data.items.map((itemSet) => (
              <Link to={`/${itemSet.category_id}/${itemSet.id}`} key={itemSet.id}>
                <div className="m-3 max-md:m-0">
                  <div
                    style={{
                      display: "inline-block",
                      margin: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    className="cursor-pointer relative hover-div w-[300px] h-[300px]"
                  >
                    <img
                      className="image"
                      src={`${Url_img}/${itemSet.img_url}`}
                      alt={itemSet.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase transition text-lg w4  hover:text-black">
                      {itemSet.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className={`${flexing}`}>
              <p className="w7">{t("unavailable")}</p>
            </div>
          )}
        </section>

        <div className={`flex my-2 justify-center items-center ${!data?.items || data?.items.length === 0 ? "hidden" : ""}`}>
          <div>
            <button
              id="previos"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gray-300 p-2 rounded-full ${
                currentPage === 1 ? "hidden" : ""
              }`}
            >
              <GrPrevious className="text-[#334774] text-[1.8rem]" />
            </button>
          </div>
          <div className="bg-gray-300 rounded-full m-10 p-4">
            <h1 className="w7 text-[#334774] ">{data?.current_page}</h1>
          </div>
          <div>
            <button
              id="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data?.last_page}
              className={`bg-gray-300 p-2 rounded-full ${
                currentPage === data?.last_page ? "hidden" : ""
              }`}
            >
              <GrNext className="text-[#334774] text-[1.8rem]" />
            </button>
          </div>
        </div>

        <div>
          <span className={`text-[#334774] w5 text-sm ${!data?.items || data?.items.length === 0 ? "hidden" : ""}`}>
            Showing from {data?.from} to {data?.to} of {data?.total}
          </span>
        </div>
      </main>

      <AdCampain ishome={false} />
    </>
  );
};

export default SearchPage;

