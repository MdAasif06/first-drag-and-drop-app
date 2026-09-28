"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Learn Next.js",
    status: "todo",
  },
  {
    id: 2,
    title: "Build Todo UI",
    status: "todo",
  },
  {
    id: 3,
    title: "Learn Docker",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Setup Jenkins",
    status: "done",
  },
];
const TaskContext = createContext();
export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const savedTasks = localStorage.getItem("task-asif");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("task-asif", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      status: "todo",
    };
    setTasks((currentTasks) => {
      return [...currentTasks, newTask];
    });
  };
  const handleDeleteTask = (id) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  };
  const handleEditTask = (task) => {
    const newTitle = window.prompt("Edit task", task.title);
    if (!newTitle || !newTitle.trim()) {
      return;
    }
    setTasks((currentTasks) => {
      return currentTasks.map((currentTask) => {
        if (currentTask.id === task.id) {
          return { ...currentTask, title: newTitle.trim() };
        }
        return currentTask;
      });
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
export function useTask() {
  return useContext(TaskContext);
}
