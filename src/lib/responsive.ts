export function getMotionScale(): number {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w < 640) return 0.35;
  if (w < 900) return 0.6;
  return 1;
}
