import { useCallback, useEffect, useRef, useState } from 'react';

const DESKTOP_BREAKPOINT = 1024;
const LEAVE_DEBOUNCE_MS = 130;

/**
 * Open/close behavior for hover-expand + click-toggle cards.
 *
 * Spec:
 *  - On a genuine desktop-sized window (>= DESKTOP_BREAKPOINT): hover opens
 *    the card live, leaving closes it. A click independently pins the card
 *    open permanently; a second click un-pins it. Both work together.
 *  - On any smaller window — tablet, mobile, or a narrow/resized desktop
 *    browser window — hover is disabled entirely. Only a click matters:
 *    first click opens, second click closes.
 *
 * Debounced leave (the flicker fix): when a card expands on hover, its own
 * bounding box grows — if the cursor happens to sit right at the original
 * edge, the box resizing under the cursor makes it repeatedly cross in and
 * out of the hover boundary, causing a rapid open/close "vibration" against
 * whichever card is now overlapping that same point. Instead of closing the
 * instant the pointer leaves, we wait a short grace period; if the pointer
 * re-enters within that window (exactly what happens during boundary
 * jitter), the pending close is cancelled and nothing visibly flickers.
 */
export default function useOpenSet(initialPinned = []) {
  const [hoverSet, setHoverSet] = useState(() => new Set());
  const [pinnedSet, setPinnedSet] = useState(() => new Set(initialPinned));
  const isSimpleMode = useRef(
    typeof window === 'undefined' || window.innerWidth < DESKTOP_BREAKPOINT
  );
  const leaveTimers = useRef(new Map());

  useEffect(() => {
    const onResize = () => {
      isSimpleMode.current = window.innerWidth < DESKTOP_BREAKPOINT;
      if (isSimpleMode.current) setHoverSet(new Set());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const timers = leaveTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const onEnter = useCallback((i) => {
    if (isSimpleMode.current) return;
    const pending = leaveTimers.current.get(i);
    if (pending) {
      clearTimeout(pending);
      leaveTimers.current.delete(i);
    }
    setHoverSet((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);

  const onLeave = useCallback((i) => {
    if (isSimpleMode.current) return;
    const existing = leaveTimers.current.get(i);
    if (existing) clearTimeout(existing);
    const timer = setTimeout(() => {
      leaveTimers.current.delete(i);
      setHoverSet((prev) => {
        if (!prev.has(i)) return prev;
        const next = new Set(prev);
        next.delete(i);
        return next;
      });
    }, LEAVE_DEBOUNCE_MS);
    leaveTimers.current.set(i, timer);
  }, []);

  const onClick = useCallback((i) => {
    setPinnedSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }, []);

  const isOpen = useCallback(
    (i) => hoverSet.has(i) || pinnedSet.has(i),
    [hoverSet, pinnedSet]
  );

  return { isOpen, onEnter, onLeave, onClick, isTouch: isSimpleMode };
}