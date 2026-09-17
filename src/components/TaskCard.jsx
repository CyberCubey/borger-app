import { useRef } from 'react';
import { Check, ChevronRight, Clock3, GripVertical } from 'lucide-react';
import { taskIcons } from './icons';

export default function TaskCard({ task, onOpen, onMove, onStartDragging, dragging }) {
  const TaskIcon = taskIcons[task.icon];
  const holdTimer = useRef(null);

  const startTouchDrag = (event) => {
    if (event.pointerType !== 'touch') return;
    event.preventDefault();
    event.stopPropagation();
    holdTimer.current = window.setTimeout(() => onStartDragging(task.id), 260);
  };

  const cancelTouchDrag = () => {
    window.clearTimeout(holdTimer.current);
  };

  return (
    <div
      className={`task-card ${task.done ? 'task-card--done' : ''} ${dragging ? 'task-card--dragging' : ''}`}
      data-task-id={task.id}
      draggable
      onDragStart={(event) => event.dataTransfer.setData('text/plain', task.id)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        onMove(event.dataTransfer.getData('text/plain'), task.id);
      }}
      onClick={onOpen}
      onKeyDown={(event) => event.key === 'Enter' && onOpen()}
      role="button"
      tabIndex="0"
    >
      <div className="task-card__icon">{task.done ? <Check size={27} /> : <TaskIcon size={27} strokeWidth={1.8} />}</div>
      <div className="task-card__content">
        <span className="task-card__time"><Clock3 size={14} /> {task.time}</span>
        <strong>{task.title}</strong>
        {task.done && <small>Klaret</small>}
      </div>
      <span className="task-card__drag" aria-label="Flyt opgave" title="Hold og flyt" onPointerDown={startTouchDrag} onPointerUp={cancelTouchDrag} onPointerCancel={cancelTouchDrag}><GripVertical size={20} /></span>
      <ChevronRight className="task-card__arrow" size={21} />
    </div>
  );
}
