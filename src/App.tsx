import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollTotop";
import Routing from "./routes/routes";
function App() {
  return (
    <>
      <ScrollToTop />
      <main className="Rubik">
        <Header/> 
        <section className="min-h-screen">       
        <Routing />
        </section>
        <Footer/>
      </main>
    </>
  );
}

export default App;
