import { CircleHelp, Phone } from 'lucide-react';
import { getToday } from '../models/dateModel';
import TaskCard from './TaskCard';

export default function Overview({ tasks, onOpenTask }) {
  const completedTasks = tasks.filter((task) => task.done).length;
  const { weekday, date } = getToday();
  

  return (
    <div className="app-frame screen-enter">
      <main className="app-main">
        <header className="topbar">
          <div className="topbar__brand"><img src="/assets/img/mitid.png" alt="Min dag" /><span>Min dag</span></div>
          <button className="icon-button" aria-label="Hjælp"><CircleHelp size={22} /></button>
        </header>

        <section className="date-heading">
          <p className="eyebrow">MIT OVERBLIK</p>
          <div className="date-heading__line"><h1>Min dag</h1><span className="date-pill">{weekday}<br /><strong>{date}</strong></span></div>
          <p className="muted">Hej (bruger). Her er det, du skal i dag.</p>
        </section>

        <section className="progress-card" aria-label="Dagens fremgang">
          <div><span>Dagens gøremål</span><strong>{completedTasks} af {tasks.length} klaret</strong></div>
          <div className="progress-track"><span style={{ width: `${(completedTasks / tasks.length) * 100}%` }} /></div>
        </section>

        <section className="task-list" aria-label="Dagens plan">
          {tasks.map((task) => <TaskCard key={task.id} task={task} onOpen={() => onOpenTask(task)} />)}
        </section>
      </main>

      <footer className="support-bar">
        <div className="support-bar__person"><div className="avatar">AL</div><div><span>Din støtteperson</span><strong>Anne Larsen</strong></div></div>
        <a className="call-button" href="tel:+4512345678" aria-label="Ring til Anne Larsen"><Phone size={21} /></a>
      </footer>
    </div>
  );
}
