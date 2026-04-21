import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export interface SmootherAPI {
  paused: (state?: boolean) => void;
  scrollTop: (value: number) => void;
  scrollTo: (target: string | number | HTMLElement, animate?: boolean, position?: string) => void;
  refresh: () => void;
  lenis: Lenis;
}

export function createSmoother(): SmootherAPI {
  const lenis = new Lenis({
    duration: 1.7,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  let isPaused = false;

  lenis.on("scroll", ScrollTrigger.update);
  const tickerFn = (time: number) => {
    if (!isPaused) lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  const smoother: SmootherAPI = {
    paused(state?: boolean) {
      if (typeof state === "boolean") {
        isPaused = state;
        if (state) lenis.stop();
        else lenis.start();
      }
    },
    scrollTop(value: number) {
      lenis.scrollTo(value, { immediate: true });
    },
    scrollTo(target, animate = true, _position?: string) {
      lenis.scrollTo(target as string | number | HTMLElement, {
        immediate: !animate,
      });
    },
    refresh() {
      lenis.resize();
      ScrollTrigger.refresh();
    },
    lenis,
  };

  return smoother;
}
