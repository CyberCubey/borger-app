import schedule from '../data/schedule.json';

const TASKS_STORAGE_KEY = 'borger-app.tasks';

// #region Task persistence
export function loadTasks() {
  try {
    const savedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : schedule;
  } catch {
    return schedule;
  }
}

export function saveTasks(tasks) {
  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

export function toggleTask(tasks, taskId) {
  return tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task);
}

export function updateTaskTime(tasks, taskId, time) {
  return tasks.map((task) => task.id === taskId ? { ...task, time } : task);
}

export function reorderTasks(tasks, draggedId, targetId) {
  const draggedIndex = tasks.findIndex((task) => task.id === draggedId);
  const targetIndex = tasks.findIndex((task) => task.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return tasks;

  const nextTasks = [...tasks];
  const [draggedTask] = nextTasks.splice(draggedIndex, 1);
  nextTasks.splice(targetIndex, 0, draggedTask);
  return nextTasks;
}
// #endregion
