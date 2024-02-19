import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollTotop";
import Whatsapp from "./components/Whatsapp";
import Routing from "./routes/routes";
//@ts-ignore
import { Helmet } from "react-helmet";
function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Deltaagro</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="soap" />
      </Helmet>
      <ScrollToTop />
      <main className="Rubik relative">
        <Header />
        <section className="min-h-screen">
          <Routing />
        </section>
        <Footer />

        <Whatsapp />
      </main>
    </>
  );
}

export default App;
