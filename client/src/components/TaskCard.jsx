import { useTasks } from "../context/tasksContext";
import { Link } from "react-router-dom";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-700 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <div className="flex gap-x-2">
        <button className="bg-red-600 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
        onClick={() => {
          deleteTask(task._id)
        }}>delete</button>
        <Link to={`/tasks/${task._id}`} className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300 text-center flex items-center">edit</Link>
      </div>
      </header>
      <p className="text-slate-200">{task.description}</p>
      <p>{new Date(task.date).toLocaleString()}</p>
    </div>
  );
}