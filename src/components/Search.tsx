import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center py-2">
          <input
            required
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search products"
            className="outline-none px-2"
          />
          <button onClick={handleClick}>
            <CiSearch className="text-[1.3rem]" />
          </button>
        </div>

        <hr />
      </div>
    </>
  );
};

export default Search;
