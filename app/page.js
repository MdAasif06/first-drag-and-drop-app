import KanbanBoard from "./components/KanbanBoard";
import TaskProvider  from "./context/TaskContext";
const Home = () => {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Todo Kanban Board
        </h1>
        <KanbanBoard />
      </main>
    </TaskProvider>
  );
};

export default Home;
