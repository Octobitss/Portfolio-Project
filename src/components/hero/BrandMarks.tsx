import { forwardRef } from "react";

export const ReactMark = forwardRef<SVGSVGElement, { className?: string }>(function ReactMark(
  { className },
  ref
) {
  return (
    <svg ref={ref} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="5.2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="2.6">
        <ellipse cx="32" cy="32" rx="24" ry="9.5" />
        <ellipse cx="32" cy="32" rx="24" ry="9.5" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="24" ry="9.5" transform="rotate(120 32 32)" />
      </g>
    </svg>
  );
});
