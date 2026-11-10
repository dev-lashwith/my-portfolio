/**
 * Mathematical calculations and utility functions for scroll & interactive animations.
 */

/**
 * Calculates horizontal marquee scroll offset based on window scroll and section geometry.
 * Formula from spec: (window.scrollY - sectionTop + window.innerHeight) * 0.3
 */
export function calculateScrollOffset(
  scrollY: number,
  sectionTop: number,
  innerHeight: number,
  factor = 0.3
): number {
  return (scrollY - sectionTop + innerHeight) * factor;
}

/**
 * Calculates the target scale for sticky-stacked project cards.
 * Formula: targetScale = 1 - (totalCards - 1 - index) * 0.03
 */
export function calculateStackScale(
  totalCards: number,
  index: number,
  scaleStep = 0.03
): number {
  if (totalCards <= 0) return 1;
  const clampedIndex = Math.max(0, Math.min(index, totalCards - 1));
  return 1 - (totalCards - 1 - clampedIndex) * scaleStep;
}

/**
 * Calculates magnetic displacement relative to the element's center when cursor is within padding.
 */
export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function calculateMagneticOffset(
  clientX: number,
  clientY: number,
  rect: Rect,
  padding = 150,
  strength = 3
): { x: number; y: number; active: boolean } {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Expanded bounding box including padding
  const minX = rect.left - padding;
  const maxX = rect.left + rect.width + padding;
  const minY = rect.top - padding;
  const maxY = rect.top + rect.height + padding;

  const isInside =
    clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY;

  if (!isInside) {
    return { x: 0, y: 0, active: false };
  }

  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;

  return {
    x: deltaX / strength,
    y: deltaY / strength,
    active: true,
  };
}

/**
 * Calculates the normalized progress interval [start, end] for character i in a string of length total.
 */
export function getCharProgressRange(
  index: number,
  total: number
): [number, number] {
  if (total <= 1) return [0, 1];
  const step = 1 / total;
  const start = index * step;
  const end = Math.min(1, start + step);
  return [start, end];
}
