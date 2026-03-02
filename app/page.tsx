import Hero from "../app/components/hero/page.jsx";
import About from "../app/components/about/page.jsx";
import Menu from "../app/components/menu/page.jsx";
import Gallery from "../app/components/gallery/page.jsx";
import Contact from "../app/components/contact/page.jsx";
import Navbar from "../app/components/navbar/page.jsx";
import Footer from "../app/components/footer /page.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}