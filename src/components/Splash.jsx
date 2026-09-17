import { useEffect } from 'react';
import logoImage from '../../assets/img/image.png';

export default function Splash({ onContinue }) {
  useEffect(() => {
    const timer = window.setTimeout(onContinue, 1000);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="splash screen-enter" aria-label="Starter Min dag">
      <img src={logoImage} alt="Min dag" />
    </div>
  );
}
