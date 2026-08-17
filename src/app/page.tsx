import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Showreel from "@/components/Showreel";
import Gallery from "@/components/Gallery";
import Room from "@/components/Room";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <MenuSection />
      <Showreel />
      <Gallery />
      <Room />
      <Reservations />
      <Footer />
    </main>
  );
}
