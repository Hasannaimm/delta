import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import AboutUsPage from "../pages/AboutUsPage";
import AllItemsPage from "../pages/AllItemsPage";
import SearchPage from "../pages/SearchPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ContactUsPage from "../pages/ContactUsPage";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:catname" element={<CategoryPage />} />
      <Route path="/:catname/:productid" element={<ProductPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/all-products" element={<AllItemsPage />} />
      <Route path="/search/:productname" element={<SearchPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  );
};

export default Routing;
