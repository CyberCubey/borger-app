import { ChevronRight, LockKeyhole } from 'lucide-react';

export default function PersonnelLogin({ onContinue }) {
  return (
    <div className="login screen-enter personnel-login">
      <p className="login__credits"><a href="https://github.com/CyberCubey/borger-app" target="_blank" rel="noreferrer">GitHub</a><span>·</span><span>CyberCubey</span></p>
      <img className="login__logo" src="/assets/img/image.png" alt="Min dag" />
      <div className="login__panel">
        <p className="eyebrow">SIKKER LOG IND · PERSONALE</p>
        <h1>Log ind med MitID</h1>
        <p>Brug din MitID-app for at komme videre til personaleoverblikket.</p>
        <div className="login__illustration"><LockKeyhole size={29} /><span>Godkend i din MitID-app</span></div>
        <button className="primary-button" onClick={onContinue}>Åbn MitID <ChevronRight size={20} /></button>
        <button className="text-button" onClick={onContinue}>Jeg har brug for hjælp</button>
        <p className="login__notice"><LockKeyhole size={14} /> Demo-login · Ingen borgerdata ændres</p>
      </div>
    </div>
  );
}
