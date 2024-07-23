import MainCarousel from "../components/MainCarousel";
import Hero from "../components/Hero";
import Star from "../components/Star";
import AdCampain from "../components/AdCampain";
import BannerAd from "../components/BannerAd";
import { MainColor } from "../utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AboutUsPart from "../components/AboutUsPart";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <main className="flex flex-col justify-center">
        <MainCarousel />

        <section className={`relative`}>
          <BannerAd />

          <Hero />
        </section>
        <div className="flex justify-center items-center my-10">
          <button
            onClick={() => {
              navigate("/all-products");
            }}
            style={{ color: MainColor }}
            className="text-lg w7"
          >
            {t("view")}
          </button>
        </div>
        <AboutUsPart/>
        <Star />
        <AdCampain ishome />
      </main>
    </>
  );
};

export default HomePage;
