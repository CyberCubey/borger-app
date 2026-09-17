import { Check, Clock3, RotateCcw, Volume2, X } from 'lucide-react';
import { taskIcons } from './icons';

function timeInputValue(time) {
  const match = time.match(/(\d{2})[.:](\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '';
}

function displayTime(value) {
  return value ? `Kl. ${value.replace(':', '.')}` : 'Vælg tidspunkt';
}

export default function TaskModal({ task, onClose, onToggleTask, onChangeTime }) {
  const TaskIcon = taskIcons[task.icon];

  const speakTask = () => {
    const speech = new SpeechSynthesisUtterance(task.title);
    speech.lang = 'da-DK';
    window.speechSynthesis?.speak(speech);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-title">
        <button className="modal-close" onClick={onClose} aria-label="Luk"><X size={21} /></button>
        <div className="modal-icon"><TaskIcon size={30} strokeWidth={1.8} /></div>
        <p className="eyebrow">DET SKAL DU GØRE</p>
        <h2 id="task-title">{task.title}</h2>
        <label className="time-editor">
          <span><Clock3 size={17} /> Tidspunkt</span>
          <input
            type="time"
            value={timeInputValue(task.time)}
            aria-label="Vælg tidspunkt"
            onChange={(event) => onChangeTime(displayTime(event.target.value))}
          />
        </label>
        <p className="task-modal__description">{task.description}</p>
        <button className="listen-button" onClick={speakTask}><Volume2 size={19} /> Hør opgaven</button>
        <button className="primary-button" onClick={onToggleTask}>
          {task.done ? <RotateCcw size={19} /> : <Check size={19} />}
          {task.done ? 'Jeg har ikke gjort det' : 'Jeg har gjort det'}
        </button>
        <button className="text-button" onClick={onClose}>Luk</button>
      </div>
    </div>
  );
}
