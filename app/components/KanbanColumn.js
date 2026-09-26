"use client";
import { useDroppable } from "@dnd-kit/core";
import TakeCard from "./TaskCard";

export default function KanbanColumn({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-80 rounded-xl p-5 shadow ${isOver ? "bg-blue-100" : "bg-white"}`}
    >
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <div>
            {tasks.map((task)=>(
                <TakeCard key={task.id} task={task}/>
            ))}
        </div>
    </div>
  );
}
