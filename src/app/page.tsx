import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import InfraCard from "@/components/homepage/InfraCard";
import NewsCard from "@/components/homepage/NewsCard";
import NewsHeader from "@/components/homepage/NewsHeader";
import OfferCarousel from "@/components/homepage/OfferCarousel";
import TopButton from "@/components/MenuButton";
import "./globals.css";

export default function Home() {
  return (
    <div className="scroll-smooth snap-mandatory snap-y" /*className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"*/>
      <div className="fixed top-0 w-full z-10 shadow-xl">
        <NewsHeader />
        <AppBar />
      </div>
      <main /*className="flex flex-col gap-8 col-start-2 items-center sm:items-start p-2"*/>
        <NewsCard className="snap-start" />
        <OfferCarousel className="snap-start" />
        <InfraCard className="snap-start" />
        <TopButton />
      </main>
      <footer>
        <Footer />
      </footer>
    </div >
  );
}
