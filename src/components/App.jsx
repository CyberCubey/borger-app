import { useState } from 'react';

import useTaskController from '../controllers/useTaskController';
import Login from './Login';
import Overview from './Overview';

import Splash from './Splash';
import TaskModal from './TaskModal';
import Welcome from './Welcome';



export default function App() {
  // #region App controller
  const [screen, setScreen] = useState('splash');
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, updateTask } = useTaskController();
  

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
  // #endregion
  

  // #region App views
  if (screen === 'splash') return <Splash onContinue={() => setScreen('welcome')} />;
  if (screen === 'welcome') return <Welcome onContinue={() => setScreen('login')} />;
  if (screen === 'login') return <Login onContinue={() => setScreen('overview')} />;
  // views til app

  return (
    <>
      <Overview tasks={tasks} onOpenTask={openTask} />
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onToggleTask={toggleSelectedTask} />}
    </>
  );
  // #endregion

}

