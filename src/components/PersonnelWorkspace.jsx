import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, FileText, LogOut, Plus, Search, UserRound, X } from 'lucide-react';
import schedule from '../data/schedule.json';
import { fetchResidents } from '../services/residentService';

const NOTES_KEY = 'borger-app.personale-notes';
const days = Array.from({ length: 5 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  return { key: date.toISOString().slice(0, 10), label: index === 0 ? 'I dag' : new Intl.DateTimeFormat('da-DK', { weekday: 'short', day: 'numeric' }).format(date) };
});

function initials(name) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

function PlanTask({ task, selected, onSelect }) {
  const holdTimer = useRef(null);
  const startHold = () => { holdTimer.current = window.setTimeout(onSelect, 420); };
  const cancelHold = () => window.clearTimeout(holdTimer.current);
  return (
    <div className={`personale-task ${selected ? 'personale-task--selected' : ''}`} onPointerDown={startHold} onPointerUp={cancelHold} onPointerCancel={cancelHold}>
      <div className="personale-task__check">{task.done ? '✓' : ''}</div>
      <div><span>{task.time}</span><strong>{task.title}</strong></div>
      {selected && <span className="personale-task__remove" aria-label="Markeret til sletning"><X size={18} /></span>}
    </div>
  );
}

function ResidentHeader({ resident, onBack }) {
  return (
    <>
      <div className="resident-back-row">
        <button className="icon-button" onClick={onBack} aria-label="Tilbage til borgerliste"><ArrowLeft size={21} /></button>
      </div>
      <section className="resident-profile">
        <div className="resident-avatar">{initials(resident.name)}</div>
        <div className="resident-profile__copy"><p className="eyebrow">BORGER</p><h1>{resident.name}</h1><p>{resident.cpr}<br />{resident.address}</p></div>
      </section>
    </>
  );
}

export default function PersonnelWorkspace({ onLogout }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedResident, setSelectedResident] = useState(null);
  const [activeTab, setActiveTab] = useState('plan');
  const [activeDay, setActiveDay] = useState(days[0].key);
  const [tasks, setTasks] = useState(() => schedule.map((task) => ({ ...task })));
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    let mounted = true;
    const load = async () => { const nextResidents = await fetchResidents(); if (mounted) { setResidents(nextResidents); setLoading(false); } };
    load();
    const refresh = window.setInterval(load, 30000);
    return () => { mounted = false; window.clearInterval(refresh); };
  }, []);

  useEffect(() => {
    try { setNotes(JSON.parse(window.localStorage.getItem(NOTES_KEY) || '{}')); } catch { setNotes({}); }
  }, []);

  const filteredResidents = useMemo(() => residents.filter((resident) => `${resident.name} ${resident.cpr}`.toLowerCase().includes(search.toLowerCase())), [residents, search]);
  const currentNote = selectedResident ? notes[selectedResident.id] || '' : '';

  const chooseResident = (resident) => { setSelectedResident(resident); setActiveTab('plan'); setSelectedTaskId(null); setTasks(schedule.map((task) => ({ ...task }))); };
  const updateNote = (value) => {
    if (!selectedResident) return;
    const nextNotes = { ...notes, [selectedResident.id]: value };
    setNotes(nextNotes);
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(nextNotes));
  };
  const removeSelectedTask = () => { if (selectedTaskId) setTasks((current) => current.filter((task) => task.id !== selectedTaskId)); setSelectedTaskId(null); };

  return (
    <div className="personale-shell screen-enter">
      <header className="personale-topbar"><button className="logout-button" onClick={onLogout}><LogOut size={17} /> Log ud</button><img src="/assets/img/mitid.png" alt="Min dag" /></header>
      {!selectedResident ? (
        <main className="resident-picker">
          <p className="eyebrow">PERSONALEOVERBLIK</p><h1>Find en borger</h1><p className="muted">Søg på navn eller CPR-nummer.</p>
          <label className="resident-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Søg efter borger" aria-label="Søg efter borger" /></label>
          <div className="resident-list" aria-live="polite">{loading ? <p className="empty-state">Henter borgere...</p> : filteredResidents.map((resident) => <button className="resident-row" key={resident.id} onClick={() => chooseResident(resident)}><span className="resident-row__avatar">{initials(resident.name)}</span><span><strong>{resident.name}</strong><small>{resident.cpr}</small></span><UserRound size={18} /></button>)}{!loading && !filteredResidents.length && <p className="empty-state">Ingen borgere matcher din søgning.</p>}</div>
        </main>
      ) : (
        <main className="resident-workspace">
          <ResidentHeader resident={selectedResident} onBack={() => setSelectedResident(null)} />
          <nav className="workspace-tabs" aria-label="Borgerdetaljer"><button className={activeTab === 'notes' ? 'is-active' : ''} onClick={() => setActiveTab('notes')}><FileText size={18} /> Journal / noter</button><button className={activeTab === 'plan' ? 'is-active' : ''} onClick={() => setActiveTab('plan')}>Plan</button></nav>
          {activeTab === 'notes' ? <section className="notes-panel"><p className="eyebrow">JOURNAL</p><h2>Noter om {selectedResident.name.split(' ')[0]}</h2><textarea value={currentNote} onChange={(event) => updateNote(event.target.value)} placeholder="Skriv noter fra møder og opfølgning..." /></section> : <section className="plan-panel"><div className="plan-panel__heading"><div><p className="eyebrow">DAGENS PLAN</p><h2>Gøremål</h2></div>{selectedTaskId && <button className="remove-task" onClick={removeSelectedTask} aria-label="Slet valgt aktivitet"><X size={19} /></button>}</div><div className="day-picker">{days.map((day) => <button key={day.key} className={activeDay === day.key ? 'is-active' : ''} onClick={() => setActiveDay(day.key)}>{day.label}</button>)}</div><p className="plan-hint">Hold på en aktivitet for at vælge den.</p><div className="personale-task-list">{tasks.map((task) => <PlanTask key={task.id} task={{ ...task, done: activeDay !== days[0].key ? task.id !== 'medicine' : task.done }} selected={selectedTaskId === task.id} onSelect={() => setSelectedTaskId(task.id)} />)}</div><button className="add-task" aria-label="Tilføj aktivitet"><Plus size={21} /></button></section>}
        </main>
      )}
    </div>
  );
}
