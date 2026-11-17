import React, { useEffect, useRef, useState } from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  /** 'sheet' rises from the bottom on phones (booking); otherwise it slides in from the right. */
  sheet?: boolean;
  children: React.ReactNode;
}

const CLOSE_MS = 380; // matches the drawer-out animation in index.css

/**
 * Slide-in drawer on the native <dialog>: Escape, focus trapping, the top layer and the
 * blurred backdrop come from the browser. It animates out before actually closing.
 */
export const Drawer: React.FC<DrawerProps> = ({ open, onClose, labelledBy, sheet, children }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open) {
      setClosing(false);
      if (!d.open) d.showModal();
      return;
    }
    if (!d.open) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return void d.close();
    setClosing(true);
    const t = setTimeout(() => {
      d.close();
      setClosing(false);
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

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
      // A click that lands on the dialog itself (not its content) is a click on the backdrop.
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="h-full max-h-[inherit] overflow-y-auto overscroll-contain">{children}</div>
    </dialog>
  );
};
