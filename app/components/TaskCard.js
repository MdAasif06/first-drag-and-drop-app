"use client";
import { useDraggable } from "@dnd-kit/core";

export default function TakeCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg bg-gray-100 shadow-sm ${isDragging ? "opacity-40" : ""}`}
    >
      {task.title}
    </div>
  );
}
