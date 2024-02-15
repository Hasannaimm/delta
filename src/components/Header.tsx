import { Link } from "react-router-dom";
import { flexing } from "../utils";
import Search from "./Search";
import { logo } from "../assets";
import { BsList } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <section className={`${flexing} justify-between px-8 py-7 Rubik w5 `}>
      <div className="md:hidden">
      <BsList className="text-[2rem] text-[#334774] " />
      </div>

        <ul className={`${flexing} text-[13px] gap-x-4 max-md:hidden `}>

          <li>
            <a href="">ContactUs</a>
          </li>
          <li>
            <a href="">AboutUS</a>
          </li>
        </ul>

        <div className="">
          <Link to={"/"} className="uppercase  w7">
           <img src={logo} height={100} width={100} className="max-md:h-[60px] max-md:w-[60px] " alt="logo" />
          </Link>
        </div>
        <div className={`${flexing} gap-x-10  max-md:hidden`}>
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
