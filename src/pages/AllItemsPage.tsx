import { useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryItems } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Url, en, lng } from "../hooks";
import MainCarousel from "../components/MainCarousel";
import CategoryPagination from "../components/CategoryPagination";
import { GrNext, GrPrevious } from "react-icons/gr";
import AdCampain from "../components/AdCampain";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";

const AllItemsPage = () => {
  const { t } = useTranslation();
  const { catname } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { isFetching, error, data } = useQuery<CategoryItems>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["categoryitems", catname, currentPage],
    queryFn: () =>
      fetch(`${Url}/${lng}/items?page=${currentPage}`).then((res) =>
        res.json()
      ),
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

      <main className="w-full flex flex-col items-center ">
        <CategoryPagination
          currentPage={currentPage}
          totalPages={data?.last_page}
          onPageChange={handlePageChange}
        />

        <div className=" flex my-2 justify-center items-center ">
          <div>
            <button
              id="previos"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gray-300 p-2 rounded-full    ${
                currentPage === 1 ? "hidden" : " "
              }   `}
            >
              <GrPrevious className="text-[#334774] text-[1.8rem] " />
            </button>
          </div>
          <div className="bg-gray-300  rounded-full m-10 p-4">
            <h1 className="w7 text-[#334774] ">{data?.current_page} </h1>
          </div>
          <div>
            <button
              id="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data?.last_page}
              className={`bg-gray-300 p-2 rounded-full    ${
                currentPage === data?.last_page ? "hidden" : " "
              }   `}
            >
              <GrNext className="text-[#334774] text-[1.8rem] " />
            </button>
          </div>
        </div>
        <div>
          <span className="text-[#334774]  w5 text-sm ">
            {t("showing", { f: data?.from, l: data?.to, t: data?.total })}
          </span>
        </div>
      </main>

      <AdCampain ishome={false} />
    </>
  );
};

export default AllItemsPage;
