import React, { createContext, useContext, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PHOTOS, PHOTO_ORDER, PhotoId } from '../data/photos.ts';

/** Opens the full-screen viewer at a photo. Provided by App. */
export const OpenPhoto = createContext<(id: PhotoId) => void>(() => {});

const src = (id: PhotoId, size: 640 | 1280 | 2048) => `/photos/${id}-${size}.webp`;
const isLandscape = (id: PhotoId) => 'landscape' in PHOTOS[id];

/** File widths: portraits are 640/1280/2048 wide, landscapes 4:3 wider. */
const srcSet = (id: PhotoId) =>
  isLandscape(id)
    ? `${src(id, 640)} 853w, ${src(id, 1280)} 1706w, ${src(id, 2048)} 2730w`
    : `${src(id, 640)} 640w, ${src(id, 1280)} 1280w, ${src(id, 2048)} 2048w`;

interface PhotoProps {
  id: PhotoId;
  /** The width it's shown at, so phones fetch the small file. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** The hero: load now, not lazily. */
  priority?: boolean;
  /** Drift gently as the page scrolls (where the browser supports scroll timelines). */
  drift?: boolean;
}

/** A salon photo that crops to its box, and opens full-screen when tapped. */
export const Photo: React.FC<PhotoProps> = ({ id, sizes, className = '', imgClassName = '', priority, drift = true }) => {
  const open = useContext(OpenPhoto);
  const [w, h] = isLandscape(id) ? [1706, 1280] : [1280, 1707];
  return (
    <button
      type="button"
      onClick={() => open(id)}
      className={`photo group relative block overflow-hidden bg-olive-deep cursor-zoom-in ${className}`}
    >
      <img
        src={src(id, 1280)}
        srcSet={srcSet(id)}
        sizes={sizes}
        width={w}
        height={h}
        alt={PHOTOS[id].alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`photo-img block w-full h-full object-cover ${drift ? 'drift' : ''} ${imgClassName}`}
      />
    </button>
  );
};

/** Full-screen photo viewer on the native <dialog>: Escape closes, arrow keys and swipes move through every photo. */
export const PhotoViewer: React.FC<{ index: number | null; onIndex: (i: number) => void; onClose: () => void }> = ({ index, onIndex, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const n = PHOTO_ORDER.length;
  const go = (step: number) => index !== null && onIndex((index + step + n) % n);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const id = index === null ? null : PHOTO_ORDER[index];

  return (
    <dialog
      ref={ref}
      className="viewer"
      aria-label="Salon photos"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onPointerDown={(e) => (swipeX.current = e.clientX)}
      onPointerUp={(e) => {
        if (swipeX.current === null) return;
        const dx = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
      // A click on the dark surround (the dialog itself) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {id && (
        <figure className="h-full w-full flex flex-col items-center justify-center gap-4 p-4 sm:p-10 pointer-events-none">
          <img
            key={id}
            src={src(id, 2048)}
            srcSet={srcSet(id)}
            sizes="100vw"
            alt={PHOTOS[id].alt}
            className="viewer-img max-h-[calc(100%-4rem)] max-w-full object-contain pointer-events-auto"
          />
          <figcaption className="text-[#F0E6D3] text-center max-w-2xl px-12">
            <span className="text-[#E9CF95] font-semibold tabular-nums mr-3">
              {index! + 1} / {n}
            </span>
            {PHOTOS[id].alt}
          </figcaption>
        </figure>
      )}
      <button type="button" onClick={onClose} aria-label="Close" className="viewer-btn absolute top-4 right-4">
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="viewer-btn absolute left-3 sm:left-6 top-1/2 -translate-y-1/2">
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Next photo" className="viewer-btn absolute right-3 sm:right-6 top-1/2 -translate-y-1/2">
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>
    </dialog>
  );
};
