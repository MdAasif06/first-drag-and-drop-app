"use client";
import React, { useState } from "react";

const Home = () => {
  const [tasks, setTask] = useState([
    { id: 1, title: "Learn Next.js", status: "todo" },
    { id: 2, title: "Build Todo UI", status: "todo" },
    { id: 3, title: "Learn Docker", status: "in-progress" },
    { id: 4, title: "Setup Jenkins", status: "done" },
  ]);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTask = tasks.filter((task) => task.status === "in-progress");
  const taskDone = tasks.filter((task) => (task.status = "done"));

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Todo Kanban Board</h1>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {/* todo */}
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-bold">Todo</h2>
          <div className="space-y-3">
            {todoTasks.map((task) => (
              <div key={task.id} className="rounded-lg bg-gray-100 p-4">{task.title}</div>
            ))}
          </div>
        </div>

        {/* progess task */}
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-bold">In Progess</h2>
          <div className="space-y-3">
            {inProgressTask.map((taskp) => (
              <div key={taskp.id} className="rounded-lg bg-gray-100 p-4">{taskp.title}</div>
            ))}
          </div>
        </div>

        {/* done task  */}
        <div className="rounded-xl bg-white p-5 shadow ">
          <h2 className="mb-4 text-xl font-bold">Done task</h2>
          <div className="space-y-3">
            {taskDone.map((taskD) => (
              <div key={taskD.id} className="rounded-lg bg-gray-100 p-4">{taskD.title}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
