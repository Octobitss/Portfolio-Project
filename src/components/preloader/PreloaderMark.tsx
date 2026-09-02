import type { RefObject } from "react";

interface PreloaderMarkProps {
  className?: string;
  dotRef: RefObject<SVGCircleElement>;
  ringRef: RefObject<SVGPathElement>;
  nodeRef: RefObject<SVGCircleElement>;
}

const RING_PATH = "M79.54 44.79 A30 30 0 1 1 60.26 21.81";

export function PreloaderMark({ className, dotRef, ringRef, nodeRef }: PreloaderMarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path ref={ringRef} d={RING_PATH} className="preloader__ring" />
      <circle ref={nodeRef} className="preloader__node" cx="72.98" cy="30.72" r="9" />
      <circle ref={dotRef} className="preloader__dot" cx="50" cy="50" r="6.5" />
    </svg>
  );
}
