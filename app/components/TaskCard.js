"use client";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export default function TakeCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`cursor-grab rounded-lg bg-gray-100 shadow-sm ${isDragging ? "opacity-40" : ""}`}
    >
      <div className="flex items-center justify-between">
        <p className="mb-3">{task.title}</p>
        <button
          {...listeners}
          {...attributes}
          className="cursor-grab px-2 text-gray-500"
        >
          {/* ⋮⋮ */}
          <GripVertical size={20} />
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="rounded bg-red-500 px-3 py-1 text-sm text-white"
        >
          delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
