import { useEffect, useState } from 'react';
import { loadTasks, saveTasks, toggleTask } from '../models/taskModel';

export default function useTaskController() {
  const [tasks, setTasks] = useState(loadTasks);

  // #region Task actions
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const updateTask = (taskId) => {
    setTasks((currentTasks) => toggleTask(currentTasks, taskId));
  };

  return { tasks, updateTask };
  // #endregion
}
