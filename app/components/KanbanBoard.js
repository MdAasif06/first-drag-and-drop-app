"use client";
import { useState,useEffect,useRef } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
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

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTasks, setActiveTasks] = useState(null);
  const isFirstRender = useRef(true);

  const handleDragStart = (e) => {
    const task = tasks.find((task) => task.id === e.active.id);
    setActiveTasks(task);
  };
  const handleDragEnd = (e) => {
    const { active, over } = e;
    setActiveTasks(null);
    if (!over) {
      return;
    }
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === active.id) {
          return { ...task, status: over.id };
        }
        return task;
      });
    });
  };

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

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const doneTasks = tasks.filter((task) => task.status === "done");
  
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
  useEffect(()=>{
    const savedTasks=localStorage.getItem("task-asif")
    if(savedTasks){
      setTasks(JSON.parse(savedTasks))
    }
  },[])
  useEffect(()=>{
    if(isFirstRender.current){
      isFirstRender.current=false
      return
    }
    localStorage.setItem("task-asif",JSON.stringify(tasks))
  },[tasks])

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />
      <DndContext id="kanban-dnd" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid gap-6 md:grid-cols-3">
          <KanbanColumn
            id="todo"
            title="Todo"
            tasks={todoTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
          <KanbanColumn
            id="in-progress"
            title="in-progress"
            tasks={inProgressTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
          <KanbanColumn
            id={"done"}
            title={"Done"}
            tasks={doneTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>
        <DragOverlay>
          {activeTasks ? (
            <TaskCard
              task={activeTasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
