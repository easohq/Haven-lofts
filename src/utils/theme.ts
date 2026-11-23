/** Switch light/dark with a soft fade, and remember the choice. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    // Keep the phone status bar the colour of the top bar after a manual switch.
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((m) => (m.content = next === 'dark' ? '#1B1A17' : '#F2EFEA'));
    try {
      localStorage.setItem('haven-theme', next);
    } catch {
      // Private browsing: the choice just won't be remembered.
    }
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();

  // A whole-page cross-fade where supported; otherwise every color transitions on its own.
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
  if (vt) return void vt.call(document, apply);
  root.classList.add('theme-fading');
  apply();
  setTimeout(() => root.classList.remove('theme-fading'), 650);
}
