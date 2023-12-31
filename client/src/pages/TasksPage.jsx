import {useEffect} from 'react'
import { useTasks } from '../context/tasksContext'
import { TaskCard } from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()    
  }, [])
  
  return (
    <div>
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
       {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  )
}

export default TasksPage