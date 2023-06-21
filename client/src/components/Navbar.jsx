import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold gap-2 flex">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>||
        <Link className="from-neutral-500" to={isAuthenticated ? "/list" : "/"}>List Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome <Link className="bg-lime-600 rounded py-1 px-3 capitalize" to={"/profile"}>{user.username}</Link>
            </li>
            <li>
              <ButtonLink className="bg-indigo-500 px-4 py-1 rounded-md" to={"/add-task"}>Add Task</ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}