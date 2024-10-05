import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import NewsCard from "./components/homepage/NewsCard";
import NewsHeader from "./components/homepage/NewsHeader";
import OfferCarousel from "./components/homepage/OfferCarousel";
import "./globals.css";

export default function Home() {
  return (
    <div className="" /*className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"*/>
      <NewsHeader />
      <AppBar />
      <main /*className="flex flex-col gap-8 col-start-2 items-center sm:items-start p-2"*/>
        <NewsCard />
        <OfferCarousel/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div >
  );
}
