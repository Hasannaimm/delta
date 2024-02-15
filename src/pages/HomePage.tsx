import MainCarousel from "../components/MainCarousel";
import Hero from "../components/Hero";
import Star from "../components/Star";
import AdCampain from "../components/AdCampain";
import BannerAd from "../components/BannerAd";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-col justify-center">
        <MainCarousel />

        <section className={`relative`}>
          <BannerAd />

          <Hero />
        </section>

        <Star />
        <AdCampain ishome />
      </main>
    </>
  );
};

export default HomePage;
