import { useState } from 'react';

import useTaskController from '../controllers/useTaskController';
import Login from './Login';
import Overview from './Overview';
import PersonnelLogin from './PersonnelLogin';
import PersonnelWorkspace from './PersonnelWorkspace';

import Splash from './Splash';
import TaskModal from './TaskModal';
import Welcome from './Welcome';



export default function App() {
  // #region App controller
  const [screen, setScreen] = useState('splash');
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, updateTask, changeTaskTime, moveTask } = useTaskController();
  

  const openTask = (task) => {
    setSelectedTask(task);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(task.title);
      speech.lang = 'da-DK';
      window.speechSynthesis.speak(speech);
    }
  };

  const toggleSelectedTask = () => {
    updateTask(selectedTask.id);
    setSelectedTask(null);
  };

  const changeSelectedTaskTime = (time) => {
    changeTaskTime(selectedTask.id, time);
    setSelectedTask((currentTask) => ({ ...currentTask, time }));
  };
  // #endregion
  

  // #region App views
  if (screen === 'splash') return <Splash onContinue={() => setScreen('welcome')} />;
  if (screen === 'welcome') return <Welcome onContinue={() => setScreen('login')} onPersonnelContinue={() => setScreen('personnel-login')} />;
  if (screen === 'login') return <Login onContinue={() => setScreen('overview')} />;
  if (screen === 'personnel-login') return <PersonnelLogin onContinue={() => setScreen('personnel')} />;
  if (screen === 'personnel') return <PersonnelWorkspace onLogout={() => setScreen('welcome')} />;
  // views til app

  return (
    <>
      <Overview tasks={tasks} onOpenTask={openTask} onMoveTask={moveTask} />
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onToggleTask={toggleSelectedTask} onChangeTime={changeSelectedTaskTime} />}
    </>
  );
  // #endregion

}

