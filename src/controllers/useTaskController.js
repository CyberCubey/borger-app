import { useEffect, useState } from 'react';
import { loadTasks, reorderTasks, saveTasks, toggleTask, updateTaskTime } from '../models/taskModel';

export default function useTaskController() {
  const [tasks, setTasks] = useState(loadTasks);

  // #region Task actions
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const updateTask = (taskId) => {
    setTasks((currentTasks) => toggleTask(currentTasks, taskId));
  };

  const changeTaskTime = (taskId, time) => {
    setTasks((currentTasks) => updateTaskTime(currentTasks, taskId, time));
  };

  const moveTask = (draggedId, targetId) => {
    setTasks((currentTasks) => reorderTasks(currentTasks, draggedId, targetId));
  };

  return { tasks, updateTask, changeTaskTime, moveTask };
  // #endregion
}
