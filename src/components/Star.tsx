import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Url, Url_img, en } from "../hooks";
import { ItemHome } from "../types";

const Star = () => {
  const { isFetching, error, data } = useQuery<ItemHome[]>({
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    queryKey: ["homeitems"],
    queryFn: () => fetch(`${Url}/${en}/homeitems`).then((res) => res.json()),
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
    return (
      <div className="flex justify-center items-center ">Network error</div>
    );
  }

  return (
    <section className={`flex  flex-col  justify-center items-center mt-10 `}>
      <h1 className="m-5 text-[2rem]  w5">Favorite Products</h1>
      <div className="flex justify-center flex-wrap gap-10">
        {data?.map((item) => (
          <ProductCard
            image={`${Url_img}/${item?.img_url}`}
            name={item?.name}
            sub={item?.category?.name}
            key={item?.id}
            catid={item?.category_id}
            id={item?.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Star;
