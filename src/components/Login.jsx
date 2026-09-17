import { ChevronRight, LockKeyhole } from 'lucide-react';

export default function Login({ onContinue }) {
  return (
    <div className="login screen-enter">
      <img className="login__logo" src="/assets/img/image.png" alt="Min dag" />
      <div className="login__panel">
        <p className="eyebrow">SIKKER LOG IND</p>
        <h1>Log ind med MitID</h1>
        <p>Brug din MitID-app for at komme videre til Min dag.</p>
        
        <div className="login__illustration"><LockKeyhole size={29} /><span>Godkend i din MitID-app</span></div>
        <button className="primary-button" onClick={onContinue}>Åbn MitID <ChevronRight size={20} /></button>
        <button className="text-button" onClick={onContinue}>Jeg har brug for hjælp</button>
      </div>
      <p className="login__notice"><LockKeyhole size={14} /> Forbindelsen er sikker</p>
    </div>
  );
}
