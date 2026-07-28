import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

import LenisProvider from "./components/LenisProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import ReserveDialog from "./components/ReserveDialog";

import Home from "./pages/Home";
import About from "./pages/About";
import MenuPage from "./pages/MenuPage";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes({ onReserve }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onReserve={onReserve} />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [reserveOpen, setReserveOpen] = useState(false);
  return (
    <div className="App zd-grain">
      <BrowserRouter>
        <LenisProvider>
          <ScrollToTop />
          <Navbar onReserve={() => setReserveOpen(true)} />
          <main className="relative z-10 pb-16 lg:pb-0">
            <AnimatedRoutes onReserve={() => setReserveOpen(true)} />
          </main>
          <Footer />
          <MobileBottomBar />
          <ReserveDialog open={reserveOpen} onClose={() => setReserveOpen(false)} />
        </LenisProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
