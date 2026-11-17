import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  /** 'sheet' rises from the bottom on phones (booking); otherwise it slides in from the right. */
  sheet?: boolean;
  children: React.ReactNode;
}

const CLOSE_MS = 380; // matches the drawer-out animation in index.css

/** Where a flick would come to rest: the same exponential deceleration as native scrolling. */
const project = (velocity: number, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);
/** Past the top edge the sheet resists more the further it's pulled, instead of stopping dead. */
const rubberband = (over: number, size: number, c = 0.55) => (over * size * c) / (size + c * over);
const isPhone = () => matchMedia('(max-width: 639px)').matches;

type Drag = { id: number; startY: number; from: number; active: boolean; hist: { y: number; t: number }[] };

/**
 * Slide-in drawer on the native <dialog>: Escape, focus trapping and the top layer come from the
 * browser. It animates out before actually closing. On phones the booking sheet can also be
 * dragged down by its top edge ([data-sheet-grab]) and flicked away.
 */
export const Drawer: React.FC<DrawerProps> = ({ open, onClose, labelledBy, sheet, children }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const y = useRef(0);
  const drag = useRef<Drag | null>(null);
  const spring = useRef<{ stop: () => void } | null>(null);
  const dismissedByDrag = useRef(false);
  const swallowClick = useRef(false);

  const setY = (v: number) => {
    y.current = v;
    if (ref.current) ref.current.style.transform = v ? `translateY(${v}px)` : '';
  };

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open) {
      setClosing(false);
      spring.current?.stop();
      setY(0);
      d.style.animation = '';
      if (!d.open) d.showModal();
      return;
    }
    if (!d.open) return;
    // Already carried off-screen by the drag: close at once, no second exit animation.
    if (dismissedByDrag.current || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      d.close();
      dismissedByDrag.current = false;
      setY(0);
      d.style.animation = '';
      return;
    }
    setClosing(true);
    const t = setTimeout(() => {
      d.close();
      setClosing(false);
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  const onPointerDown = (e: React.PointerEvent) => {
    swallowClick.current = false; // a fresh press is never the tail of an old drag
    if (!sheet || !isPhone() || !(e.target as Element).closest('[data-sheet-grab]')) return;
    spring.current?.stop(); // catch it mid-flight, from wherever it is right now
    drag.current = { id: e.pointerId, startY: e.clientY, from: y.current, active: false, hist: [{ y: e.clientY, t: e.timeStamp }] };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = drag.current;
    const d = ref.current;
    if (!g || !d || e.pointerId !== g.id) return;
    const dy = e.clientY - g.startY;
    if (!g.active) {
      if (Math.abs(dy) < 10) return; // a little hysteresis, so a tap stays a tap
      g.active = true;
      d.style.animation = 'none';
      try {
        d.setPointerCapture(e.pointerId); // keep tracking even if the finger slides off the sheet
      } catch {
        // The pointer already ended; the drag still finishes on pointerup.
      }
    }
    g.hist.push({ y: e.clientY, t: e.timeStamp });
    while (g.hist.length > 2 && e.timeStamp - g.hist[0].t > 100) g.hist.shift();
    const next = g.from + dy;
    setY(next < 0 ? -rubberband(-next, d.offsetHeight) : next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = drag.current;
    const d = ref.current;
    drag.current = null;
    if (!g || !d || !g.active) return;
    // The drag shouldn't also count as a click on what it started on. The browser fires that click
    // right after pointerup, if at all, so the guard only lives until the next task.
    swallowClick.current = true;
    setTimeout(() => (swallowClick.current = false), 0);
    const first = g.hist[0];
    const last = g.hist[g.hist.length - 1];
    const dt = Math.max(16, last.t - first.t) / 1000;
    const velocity = e.type === 'pointercancel' ? 0 : (last.y - first.y) / dt;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Decide from where the gesture is heading, not just where the finger let go.
    if (y.current + project(velocity) > d.offsetHeight * 0.45) {
      spring.current = animate(y.current, d.offsetHeight, {
        type: 'spring',
        bounce: 0,
        duration: reduced ? 0.2 : 0.35,
        velocity,
        onUpdate: setY,
        onComplete: () => {
          dismissedByDrag.current = true;
          onClose();
        },
      });
    } else {
      spring.current = animate(y.current, 0, {
        type: 'spring',
        bounce: reduced ? 0 : 0.15,
        duration: 0.4,
        velocity,
        onUpdate: setY,
      });
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`drawer ${sheet ? 'sheet' : ''} ${closing ? 'closing' : ''}`}
      // Escape: run our close animation instead of the browser's instant close.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={(e) => {
        if (!swallowClick.current) return;
        swallowClick.current = false;
        e.stopPropagation();
        e.preventDefault();
      }}
      // A click that lands on the dialog itself (not its content) is a click on the backdrop.
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="h-full max-h-[inherit] overflow-y-auto overscroll-contain">{children}</div>
    </dialog>
  );
};
