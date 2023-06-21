import { useEffect, useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

function ProfilePage() {
  const {register, handleSubmit, setValue,  formState: { errors }} = useForm();
  const { isAuthenticated, logout, user, updateUser } = useAuth();
  const navigate = useNavigate()
  
  useEffect(()=>{
    async function loadUser(){
     if(user.id){
       setValue('username', user.username)
       setValue('email', user.email)
     }
    }
    loadUser()
   }, [])

   const onSubmit = handleSubmit((data) =>{   
    try {
      updateUser(user.id, data)    
      navigate('/tasks')
      location.reload()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
            <input type="text" {... register("username", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="usename"/>
            {errors.username && (
              <p className="text-red-500">username requerido</p>
            )}
            <input type="email" {... register("email", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
            {errors.email && (
              <p className="text-red-500">email requerido</p>
            )}
           
            <button type="submit">Update</button>
        </form>
    </div>
  )
}

export default ProfilePage