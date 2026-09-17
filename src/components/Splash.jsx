import { useEffect } from 'react';

export default function Splash({ onContinue }) {
  useEffect(() => {
    const timer = window.setTimeout(onContinue, 1000);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="splash screen-enter" aria-label="Starter Min dag">
      <img src="/assets/img/image.png" alt="Min dag" />
    </div>
  );
}
