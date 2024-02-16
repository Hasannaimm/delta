import { Link } from "react-router-dom";
import { Url_img } from "../hooks";

type CategoryItems = {
  id: number;
  url: string;
  name: string | undefined;
};

const CategorieItems = ({ id, url, name }: CategoryItems) => {
  return (
    <>
      <Link to={String(id)}>
        <div className="m-3 max-md:m-0 ">
          <div
            key={id}
            style={{
              display: "inline-block",
              margin: "8px",
              overflow: "hidden",
              position: "relative",
            }}
            className="cursor-pointer relative hover-div  w-[300px] h-[300px]  "
          >
            <img
              className="image"
              src={`${Url_img}/${url}`}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase transition text-lg w4  hover:text-black">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategorieItems;
