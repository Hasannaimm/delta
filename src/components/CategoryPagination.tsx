import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Url, lng } from "../hooks";
import { CategoryItems } from "../types";
import { flexing } from "../utils";
import { useParams } from "react-router-dom";
import CategorieItems from "../components/CategorieItems";
import { useTranslation } from "react-i18next";

interface CategoryPaginationProps {
  onPageChange: (newPage: number) => void;
  currentPage: number | undefined;
  totalPages: number | undefined;
}

const CategoryPagination: React.FC<CategoryPaginationProps> = ({
  currentPage,
}) => {
  let { catname } = useParams();

  const { isFetching, error, data } = useQuery<CategoryItems>({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ["categoryitems", catname, currentPage], // Include currentPage in the queryKey
    queryFn: () =>
      fetch(`${Url}/${lng}/filteritems/${catname}?page=${currentPage}`).then(
        (res) => res.json()
      ),
  });

  if (isFetching) {
    return null;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }
const {t} =useTranslation()
  return (
    <>
      <section className="flex flex-wrap justify-center items-center w-[70%] mt-10">
        {data && data.items.length > 0 ? (
          data?.items?.map((itemSet, setIndex) => (
            <CategorieItems
              id={itemSet.id}
              name={itemSet.name}
              key={setIndex}
              url={itemSet.img_url}
            />
          ))
        ) : (
          <div className={`${flexing}`}>
            <p className="w7">{t("unavailable")}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default CategoryPagination;
