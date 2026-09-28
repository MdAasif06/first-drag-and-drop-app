"use client";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { useTask } from "../context/TaskContext";

export default function KanbanBoard() {
  const [activeTasks, setActiveTasks] = useState(null);
  const {
    tasks,
    setTasks,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
  } = useTask();

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

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <>
      <TaskForm onAddTask={handleAddTask} />
      <DndContext
        id="kanban-dnd"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
            title="In-progress"
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
