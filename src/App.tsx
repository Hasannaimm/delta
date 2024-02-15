import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollTotop";
import Whatsapp from "./components/Whatsapp";
import Routing from "./routes/routes";
function App() {
  return (
    <>
      <ScrollToTop />
      <main className="Rubik relative">
        <Header />
        <section className="min-h-screen">
          <Routing />
        </section>
        <Footer />

     <Whatsapp/>
      </main>
    </>
  );
}

export default App;
