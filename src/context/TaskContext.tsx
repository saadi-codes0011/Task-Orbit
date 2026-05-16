import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  category?: string;
  assignee?: string;
  status: TaskStatus;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];

  addTask: (task: Task) => void;

  updateTaskStatus: (
    id: string,
    status: TaskStatus
  ) => void;

  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(
  null
);

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);
  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };
  const updateTaskStatus = (
    id: string,
    status: TaskStatus
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskProvider"
    );
  }

  return context;
};