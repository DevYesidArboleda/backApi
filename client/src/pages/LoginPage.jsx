import {useForm} from "react-hook-form"
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {

  const {register, handleSubmit, formState: { errors }} = useForm()
  const {signin, errors:signinErrors, isAuthenticated} =  useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) =>{
    signin(data)
  })

  useEffect(()=>{
     if(isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-600 w-full rounded-md p-10 max-w-md">
      {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-4xl font-bold py-2">Login</h1>
      <form onSubmit={onSubmit}>            
            <input type="email" {... register("email", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
            {errors.email && (
              <p className="text-red-500">email requerido</p>
            )}
            <input type="password" {... register("password", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"/>
            {errors.password && (
              <p className="text-red-500">password requerido</p>
            )}
            <button type="submit">login</button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage