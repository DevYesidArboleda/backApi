import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/authContext"
import TasksPage from "./pages/TasksPage"
import TaskFormPage from "./pages/TaskFormPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import { ProtectedRoute } from "./ProtectedRoute"
import { TaskProvider } from "./context/tasksContext"
import { Navbar } from "./components/Navbar"
import ListPage from "./pages/ListPage"

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto">
          <Navbar/>
          <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/login" element={ <LoginPage/> } />
            <Route path="/register" element={ <RegisterPage/> } />
            <Route element={<ProtectedRoute/>}>
              <Route path="/profile" element={ <ProfilePage/> } />
              <Route path="/tasks" element={ <TasksPage/> } />
              <Route path="/add-task" element={ <TaskFormPage/> } />
              <Route path="/list" element={ <ListPage/> } />
              <Route path="/tasks/:id" element={ <TaskFormPage/> } />
            </Route>
          </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
