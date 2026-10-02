export {};
// All artwork remains ordinary image links until the dialog is ready.
const dialog = document.querySelector<HTMLDialogElement>('.art-viewer');
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-art-open]'));
if (dialog && typeof dialog.showModal === 'function' && links.length) {
  const image = dialog.querySelector<HTMLImageElement>('.viewer-image')!;
  const title = dialog.querySelector<HTMLElement>('#viewer-title')!;
  const caption = dialog.querySelector<HTMLElement>('#viewer-caption')!;
  const credit = dialog.querySelector<HTMLElement>('.viewer-credit')!;
  const download = dialog.querySelector<HTMLAnchorElement>('.viewer-download')!;
  const original = dialog.querySelector<HTMLAnchorElement>('.viewer-original')!;
  const error = dialog.querySelector<HTMLElement>('.viewer-error')!;
  const count = dialog.querySelector<HTMLElement>('.viewer-count')!;
  const navigation = dialog.querySelector<HTMLElement>('.viewer-navigation')!;
  let current = 0;
  let opener: HTMLAnchorElement | undefined;
  navigation.hidden = links.length === 1;

  function show(index: number) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const card = link.closest<HTMLElement>('[data-scrap-card]')!;
    const preview = link.querySelector<HTMLImageElement>('img')!;
    title.textContent = card.querySelector('[data-art-title]')!.textContent;
    caption.textContent = card.querySelector('[data-art-caption]')!.textContent;
    credit.textContent = card.querySelector('[data-art-credit]')!.textContent;
    const printable = card.querySelector<HTMLAnchorElement>('[data-art-download]');
    download.hidden = !printable;
    if (printable) download.href = printable.href;
    else download.removeAttribute('href');
    error.hidden = true;
    image.alt = preview.alt;
    image.src = link.href;
    original.href = link.href;
    count.textContent = `${current + 1} / ${links.length} · ${title.textContent}`;
  }
  image.addEventListener('error', () => {
    error.hidden = false;
  });
  image.addEventListener('load', () => {
    error.hidden = true;
  });
  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
        return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
    });
  });
  dialog.querySelector('.viewer-close')!.addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev')!.addEventListener('click', () => show(current - 1));
  dialog.querySelector('.viewer-next')!.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
    if (event.key === 'Tab') {
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href]')).filter(
        (element) => element.getClientRects().length > 0,
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  dialog.addEventListener('close', () => {
    opener?.focus({ preventScroll: true });
  });
}

// Decorative movement only: content and hit targets never follow the pointer.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scrap-scene]'));
const resets: Array<() => void> = [];
for (const scene of scenes) {
  let frame = 0;
  let x = 0;
  let y = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    scene.style.removeProperty('--scrap-x');
    scene.style.removeProperty('--scrap-y');
  };
  resets.push(reset);
  scene.addEventListener(
    'pointermove',
    (event) => {
      if (reduced.matches || !fine.matches || event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = scene.getBoundingClientRect();
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        scene.style.setProperty(
          '--scrap-x',
          `${clamp(((x - rect.left) / rect.width) * 2 - 1) * 4}px`,
        );
        scene.style.setProperty(
          '--scrap-y',
          `${clamp(((y - rect.top) / rect.height) * 2 - 1) * 4}px`,
        );
      });
    },
    { passive: true },
  );
  scene.addEventListener('pointerleave', reset);
  scene.addEventListener('pointercancel', reset);
}
const resetAll = () => resets.forEach((reset) => reset());
window.addEventListener('blur', resetAll);
window.addEventListener('scroll', resetAll, { passive: true });
reduced.addEventListener('change', resetAll);
fine.addEventListener('change', resetAll);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) resetAll();
});
