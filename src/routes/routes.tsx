import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsPage from "../pages/NewsPage";
import NewSpecificPage from "../pages/NewSpecificPage";
const HomePage = React.lazy(() => import("../pages/HomePage"));
const CategoryPage = React.lazy(() => import("../pages/CategoryPage"));
const ProductPage = React.lazy(() => import("../pages/ProductPage"));
const AboutUsPage = React.lazy(() => import("../pages/AboutUsPage"));
const AllItemsPage = React.lazy(() => import("../pages/AllItemsPage"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy"));
const ContactUsPage = React.lazy(() => import("../pages/ContactUsPage"));
const BlogPage = React.lazy(() => import("../pages/BlogPage"));
const BlogSpecificPage = React.lazy(() => import("../pages/BlogSpecificPage"));
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:catname" element={<CategoryPage />} />
      <Route path="/:catname/:productid" element={<ProductPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/all-products" element={<AllItemsPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogSpecificPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewSpecificPage />} />
      <Route path="/search/:productname" element={<SearchPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
    </Routes>
  );
};

export default Routing;
