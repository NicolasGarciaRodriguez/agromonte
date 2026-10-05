import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";

// How long the page-transition exit animation takes (see motion.main
// below) — the new route's content isn't in the DOM until that finishes,
// since <AnimatePresence mode="wait"> waits for the old page to fade out
// first.
const PAGE_TRANSITION_MS = 350;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  // The page sections that own ScrollTrigger instances (Hero's parallax,
  // every FruitSection's canvas scrub) just mounted or unmounted along
  // with this navigation. GSAP batches its own re-measure of all trigger
  // positions a tick later, and that recalculation can itself nudge the
  // scroll position — which, if it happens *after* our scrollIntoView,
  // looks exactly like the link silently doing nothing. Forcing the
  // refresh ourselves first means there's nothing left for GSAP to change
  // out from under us.
  ScrollTrigger.refresh();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

// Centralises what happens after any navigation: jump to the top of the
// new page, or — if the link carried a hash (e.g. footer/nav links to
// "/#contacto" or "/productos#granada") — scroll to that section. A
// same-page hash change (e.g. clicking "Contacto" while already on "/")
// can scroll right away; a path change needs to wait out the page-exit
// animation, and then — since that's still only an estimate of when
// everything has actually mounted and laid out — we verify the scroll
// landed and retry a couple of times if something pushed it back.
function ScrollManager() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = prevPathname.current !== location.pathname;
    prevPathname.current = location.pathname;

    if (location.hash) {
      const id = location.hash.slice(1);
      const baseDelay = pathChanged ? PAGE_TRANSITION_MS + 60 : 60;
      const attempts = [baseDelay, baseDelay + 200, baseDelay + 500];
      const timers = attempts.map((delay) =>
        setTimeout(() => {
          const el = document.getElementById(id);
          if (!el) return;
          const target = Math.round(window.scrollY + el.getBoundingClientRect().top);
          if (Math.abs(window.scrollY - target) > 4) scrollToId(id);
        }, delay)
      );
      return () => timers.forEach(clearTimeout);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}

// Wraps a single route's page so it owns its own enter/exit animation.
// AnimatePresence tracks children by key, and the key it sees here lives on
// <Routes> itself (below) — so each navigation produces a brand new <Routes>
// element (new key) whose matched Route already renders a complete,
// independent motion.main. The outgoing <Routes> instance (old key) is left
// exactly as it last rendered and animates out on its own; nothing late
// mutates its content out from under the exit animation, which is what was
// leaving the old page frozen at opacity:0 forever.
function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <ScrollManager />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/productos" element={<PageTransition><Products /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
