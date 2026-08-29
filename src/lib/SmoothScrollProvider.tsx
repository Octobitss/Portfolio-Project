import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, ensureGsap } from "./gsap";

interface MotionContextValue {
  reducedMotion: boolean;
  lenis: Lenis | null;
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  lenis: null,
});

export function useMotionPrefs() {
  return useContext(MotionContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ensureGsap();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setReady(true);
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <MotionContext.Provider
      value={{ reducedMotion, lenis: ready ? lenisRef.current : null }}
    >
      {children}
    </MotionContext.Provider>
  );
}
