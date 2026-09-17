import { ChevronRight, Info, LockKeyhole, UserRound } from 'lucide-react';

export default function Welcome({ onContinue, onPersonnelContinue }) {
  return (
    <div className="onboarding screen-enter">
      <div className="onboarding__mark">M</div>
      <p className="eyebrow">VELKOMMEN</p>
      <h1>Hvem logger ind?</h1>
      <p className="intro">Vælg den løsning, der passer til dig.</p>
      <button className="choice-button choice-button--primary" onClick={onContinue}>
        <UserRound size={23} />
        <span><strong>Borger</strong><small>Se min dag og mine aftaler</small></span>
        <ChevronRight />
      </button>
      <button className="choice-button" onClick={onPersonnelContinue}>
        <LockKeyhole size={23} />
        <span><strong>Personale</strong><small>Find borgere og se deres plan</small></span>
        <ChevronRight />
      </button>
      <p className="onboarding__footer"><Info size={15} /> Du kan altid få hjælp af din støtteperson.</p>
    </div>
  );
}
