"use client";
import { useState } from "react";

export default function TaskForm({onAddTask}) {
  const [title, setTitle] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!title.trim()){
    return
    }
    onAddTask(title)
    setTitle("")

  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-8 flex max-w-6xl gap-3">
      <input
        type="text"
        value={title}
        placeholder="Enter task..."
        onChange={(e)=>setTitle(e.target.value)}
        className="flex-1 rounded-lg border bg-white px-4 py-3 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Add Task
      </button>
    </form>
  );
}
