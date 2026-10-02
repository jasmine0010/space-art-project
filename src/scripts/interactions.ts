// Small, event-driven enhancements. No animation loop runs when the pointer is idle.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const scenes = Array.from(document.querySelectorAll<HTMLElement>('.space-art'));
const cards = Array.from(document.querySelectorAll<HTMLElement>('.branch-card'));
const resets: Array<() => void> = [];
const motionAllowed = () => !reducedMotion.matches && finePointer.matches;

function followPointer(
  surface: HTMLElement,
  update: (x: number, y: number) => void,
  clear: () => void,
) {
  let frame = 0;
  let clientX = 0;
  let clientY = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    clear();
  };
  surface.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || !motionAllowed()) return;
      clientX = event.clientX;
      clientY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!motionAllowed()) return;
        const bounds = surface.getBoundingClientRect();
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        update(
          clamp(((clientX - bounds.left) / bounds.width - 0.5) * 2),
          clamp(((clientY - bounds.top) / bounds.height - 0.5) * 2),
        );
      });
    },
    { passive: true },
  );
  surface.addEventListener('pointerleave', reset);
  surface.addEventListener('pointercancel', reset);
  resets.push(reset);
}

for (const scene of scenes) {
  const surface = scene.closest<HTMLElement>('.hero, .split-intro') ?? scene;
  followPointer(
    surface,
    (x, y) => {
      scene.style.setProperty('--scene-x', `${(x * 7).toFixed(2)}px`);
      scene.style.setProperty('--scene-y', `${(y * 5).toFixed(2)}px`);
      scene.style.setProperty('--eye-x', `${(x * 3).toFixed(2)}px`);
      scene.style.setProperty('--eye-y', `${(y * 3).toFixed(2)}px`);
    },
    () => {
      for (const key of ['--scene-x', '--scene-y', '--eye-x', '--eye-y'])
        scene.style.removeProperty(key);
    },
  );

  const button = scene.querySelector<HTMLButtonElement>('.planet-play')!;
  const planet = scene.querySelector<SVGGElement>('.planet-reaction')!;
  const sparkles = scene.querySelector<HTMLElement>('.space-sparkles')!;
  let reaction: Animation | undefined;
  let happyTimer: ReturnType<typeof setTimeout> | undefined;
  const clearReaction = () => {
    reaction?.cancel();
    reaction = undefined;
    clearTimeout(happyTimer);
    sparkles.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    sparkles.replaceChildren();
    scene.classList.remove('is-happy');
  };
  resets.push(clearReaction);
  button.addEventListener('click', () => {
    clearReaction();
    scene.classList.add('is-happy');
    happyTimer = setTimeout(() => scene.classList.remove('is-happy'), 900);
    // Reduced motion still gets an immediate, static blush as feedback.
    if (reducedMotion.matches) return;
    reaction = planet.animate(
      [
        { rotate: '0deg', scale: '1' },
        { rotate: '-7deg', scale: '1.035', offset: 0.25 },
        { rotate: '5deg', scale: '1.02', offset: 0.55 },
        { rotate: '-2deg', scale: '1', offset: 0.8 },
        { rotate: '0deg', scale: '1' },
      ],
      { duration: 650, easing: 'ease-out' },
    );
    const radius = scene.clientWidth * 0.27;
    for (let i = 0; i < 8; i++) {
      const star = document.createElement('span');
      star.className = 'space-spark';
      star.textContent = i % 2 ? '✧' : '✦';
      sparkles.append(star);
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.85;
      const animation = star.animate(
        [
          { transform: `translate(${x * 0.65}px, ${y * 0.65}px) scale(.3)`, opacity: 0 },
          { opacity: 1, offset: 0.2 },
          {
            transform: `translate(${x}px, ${y}px) rotate(${i % 2 ? 40 : -40}deg) scale(1.1)`,
            opacity: 0,
          },
        ],
        { duration: 650 + i * 25, easing: 'ease-out' },
      );
      animation.onfinish = () => star.remove();
    }
  });
  // Avoid presenting a nonfunctional button when scripts are unavailable.
  scene.dataset.interactive = '';
}

for (const card of cards) {
  followPointer(
    card,
    (x, y) => {
      card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
    },
    () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    },
  );
}

const resetAll = () => resets.forEach((reset) => reset());
const syncPreferences = () => {
  resetAll();
  cards.forEach((card) => card.toggleAttribute('data-tilt', motionAllowed()));
};
reducedMotion.addEventListener('change', syncPreferences);
finePointer.addEventListener('change', syncPreferences);
window.addEventListener('blur', resetAll);
window.addEventListener('scroll', resetAll, { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) resetAll();
});
syncPreferences();
