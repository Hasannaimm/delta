type CategoriesHero = {
  name: string | undefined;
  imageurl: string | undefined;
  isabout: boolean | undefined;
};

const CategoriesHero = ({ name, imageurl , isabout }: CategoriesHero) => {
  return (
    <section
      className="w-full h-[500px] flex flex-col justify-center items-start gap-y-7 p-10 "
      style={{
        backgroundImage: `url(${imageurl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className={`text-white w7 text-[3rem] ml-10 max-md:ml-0 ${isabout? ' hidden'  :''}`}>{name}</h1>
    </section>
  );
};

export default CategoriesHero;
