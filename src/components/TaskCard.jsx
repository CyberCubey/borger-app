import { Check, ChevronRight, Clock3 } from 'lucide-react';
import { taskIcons } from './icons';

export default function TaskCard({ task, onOpen }) {
  const TaskIcon = taskIcons[task.icon];

  return (
    <button className={`task-card ${task.done ? 'task-card--done' : ''}`} onClick={onOpen}>
      <div className="task-card__icon">{task.done ? <Check size={27} /> : <TaskIcon size={27} strokeWidth={1.8} />}</div>
      <div className="task-card__content">
        <span className="task-card__time"><Clock3 size={14} /> {task.time}</span>
        <strong>{task.title}</strong>
        {task.done && <small>Klaret</small>}
      </div>
      <ChevronRight className="task-card__arrow" size={21} />
    </button>
  );
}
