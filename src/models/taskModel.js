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
// #endregion
