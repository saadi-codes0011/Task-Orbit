import type { Task } from "../context/TaskContext";

export const getOverdueTasks = (tasks: Task[]) => {
  const today = new Date();

  return tasks.filter((task) => {
    return (
      new Date(task.deadline) < today &&
      task.status !== "Completed"
    );
  });
};

export const getCompletedTasks = (tasks: Task[]) => {
  return tasks.filter(
    (task) => task.status === "Completed"
  );
};

export const getPendingTasks = (tasks: Task[]) => {
  return tasks.filter(
    (task) => task.status === "Pending"
  );
};

export const getInProgressTasks = (tasks: Task[]) => {
  return tasks.filter(
    (task) => task.status === "In Progress"
  );
};

export const getTotalTasks = (tasks: Task[]) => {
  return tasks.length;
};

export const filterTasks = (
  tasks: Task[],
  filter: string
) => {
  switch (filter) {
    case "Pending":
      return getPendingTasks(tasks);

    case "Completed":
      return getCompletedTasks(tasks);

    case "Overdue":
      return getOverdueTasks(tasks);

    case "In Progress":
      return getInProgressTasks(tasks);

    default:
      return tasks;
  }
};