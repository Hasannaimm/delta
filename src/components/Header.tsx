import { Link } from "react-router-dom";
import { flexing } from "../utils";
import Search from "./Search";



const Header = () => {
  return (
    <>
      <section className={`${flexing} justify-between px-8 py-7 Rubik w5 `}>
        <ul className={`${flexing} text-[13px] gap-x-4`}>
          <li>
            <a href="">ContactUs</a>
          </li>
          <li>
            <a href="">AboutUS</a>
          </li>
        </ul>

        <div>
          <Link to={"/"} className="uppercase  w7">Deltaagro</Link>
        </div>
        <div className={`${flexing} gap-x-10`}>
          <div className="p-1 flex flex-col  gap-y-2">
            <div className={`flex justify-end mr-2`}>
              <h1>Eng</h1>
            </div>

            <Search />
          </div>
        </div>
      </section>
     
    </>
  );
};

export default Header;
