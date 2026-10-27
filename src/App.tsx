import { useEffect } from "react";
import { initSmoothScroll, ScrollTrigger } from "./lib/motion";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Philosophy from "./components/Philosophy";
import Capabilities from "./components/Capabilities";
import Work from "./components/Work";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const destroy = initSmoothScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      destroy();
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Intro />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Philosophy />
        <Capabilities />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
