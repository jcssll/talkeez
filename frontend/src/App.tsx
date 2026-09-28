import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Home from "@/pages/Home";
import MyDailyActivity from "@/pages/MyDailyActivity";
import NotFound from "@/pages/NotFound";

// Redirects that preserve the existing clean tool URLs (talkeez.org/aac etc.)
// by forwarding them to the untouched static pages.
function StaticRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-daily-activity" element={<MyDailyActivity />} />
      <Route path="/index.html" element={<StaticRedirect to="/" />} />
      <Route path="/aac" element={<StaticRedirect to="/aac.html" />} />
      <Route path="/sensory-timer" element={<StaticRedirect to="/sensory-timer.html" />} />
      <Route path="/picture-cards" element={<StaticRedirect to="/picture-cards.html" />} />
      <Route path="/daily-activity" element={<StaticRedirect to="/daily-activity.html" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
