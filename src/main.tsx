import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import Loader from "./components/Loader.tsx";

//?Tanstack Query
const queryClient = new QueryClient();

//?Loading Suspense
const loadingMarkup = (
  <div className=" flex justify-center items-center h-screen">
    <Loader />
  </div>
);

//?Language Setup

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr"],
    fallbackLng: "en",
    debug: false,
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          aboutUs: "About Us",
          allProducts: "All Products",
          Search: "Search",
          language: "Fr",
          favorite: "Favorite Products",
          discover: "Discover More",
          ad: "AD",
          about: "About Us",
          showing: "Showing from {{f}} to {{l}} of {{t}}",
          related: "Related Products",
          followus: "Contact Us",
          unavailable: "Data Not Available",
          home: "Home",
          view: "View all Products!",
          contact: "Contact Us",
          blogd:
            "Did you know that Marseille soap made by Delta Agro has many uses that few people know about.We finally reveal the secret of multi-use! So you can take care of your body, maintain the house, remove stains and clean your laundry and even your jewelry with a single product!",
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour",
          aboutUs: "À Propos de Nous",
          allProducts: "Tous les Produits",
          Search: "recherche",
          language: "En",
          favorite: "Produits préférés",
          discover: "Découvrir plus",
          ad: "annonce",
          about: "à propos de nous",
          showing: "Affichage de {{f}} à {{l}} sur {{t}}",
          related: "Produits connexes",
          followus: "Contactez-nous",
          unavailable: "Données non disponibles",
          home: "maison",
          view: "Voir tous les produits!",
          contact: "Contactez-nous",
          blogd:
            "Saviez-vous que le savon de Marseille fabriqué par Delta Agro a de nombreuses utilisations que peu de gens connaissent.On vous révèle enfin le secret du multi-usage ! Vous pourrez ainsi prendre soin de votre corps, entretenir la maison, enlever les taches et nettoyer votre linge et même vos bijoux avec un seul produit !",
        },
      },
    },
    detection: {
      order: ["cookie", "htmlTag", "path"],
      caches: ["cookie"],
    },
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);
