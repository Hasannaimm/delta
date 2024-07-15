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

//?Tanstack Query
const queryClient = new QueryClient();

//?Loading Suspense
const loadingMarkup = (
  <div className="loader flex justify-center items-center h-screen">
    <span className="loader-text">loading</span>
    <span className="load"></span>
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
          unavailable:"Data Not Available" ,
          home:"Home",
          view:"View all Products!",
          contact:"Contact Us",
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
          unavailable:"Données non disponibles",
          home:"maison" , 
          view:"Voir tous les produits!",
          contact:"Contactez-nous",
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
      <BrowserRouter >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);
