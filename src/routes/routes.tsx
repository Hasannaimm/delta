import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import AboutUsPage from "../pages/AboutUsPage";
const Routing = () => {
  return (
    <Routes>
  
      <Route path="/" element={<HomePage />} />
      //? Category name
      <Route path="/:catname" element={<CategoryPage />} />
      <Route path="/:catname/:productid" element={<ProductPage/> } />
      <Route path="/about-us" element={<AboutUsPage/>} />
    </Routes>
  );
};

export default Routing;
