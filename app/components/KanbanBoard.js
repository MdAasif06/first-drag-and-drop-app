"use client";
import { useState } from "react";
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

  const handleAddTask=(title)=>{
    const newTask={
      id:Date.now(),
      title:title,
      status:"todo"
    }
    setTasks((currentTasks)=>{
      return [...currentTasks,newTask]
    })
  }

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <>
    <TaskForm onAddTask={handleAddTask}/>
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid gap-6 md:grid-cols-3">
        <KanbanColumn id="todo" title="Todo" tasks={todoTasks} />
        <KanbanColumn
          id="in-progress"
          title="in-progress"
          tasks={inProgressTasks}
        />
        <KanbanColumn id={"done"} title={"Done"} tasks={doneTasks} />
      </div>
      <DragOverlay>
        {activeTasks ? <TaskCard task={activeTasks} /> : null}
      </DragOverlay>
    </DndContext>
    </>
  );
}
