import Nav from "@/components/Nav";
import OrderBar from "@/components/OrderBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Kitchen from "@/components/Kitchen";
import Room from "@/components/Room";
import Catering from "@/components/Catering";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <Kitchen />
      <Room />
      <Catering />
      <Reservations />
      <Footer />
      <OrderBar />
    </main>
  );
}
