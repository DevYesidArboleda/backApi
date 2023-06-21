import { useEffect, useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/tasksContext';
import { useNavigate, useParams } from "react-router-dom";

function TaskFormPage() {
  const {register, handleSubmit, setValue} = useForm();
  const {createTask, getTask, updateTask} = useTasks()
  const navigate = useNavigate()
  const params = useParams();

  useEffect(()=>{
   async function loadTask(){
    if(params.id){
      const task =  await getTask(params.id);
      setValue('title', task.title)
      setValue('description', task.description)
    }
   }
   loadTask()
  }, [])

  const onSubmit = handleSubmit((data) =>{
    if(params.id){
      updateTask(params.id, data)
    }else{
      createTask(data)
    }
    navigate('/tasks')
  })
  return (
    <div className='bg-zinc-700 w-full max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        
      <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="bg-zinc-600 w-full text-white px-4 py-2 rounded-md my-2"
        />
        

        <textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="bg-zinc-600 w-full text-white px-4 py-2 rounded-md my-2"
        ></textarea>

        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage