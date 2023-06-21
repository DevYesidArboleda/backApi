import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

    const {register, handleSubmit,  formState: { errors }} = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async(values)=>{
        console.log(values);
        signup(values);
        console.log(res)
    });

  return (
    <div className="flex w-full  justify-center items-center py-5">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md w-full h-full">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
            <input type="text" {... register("username", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="usename"/>
            {errors.username && (
              <p className="text-red-500">username requerido</p>
            )}
            <input type="email" {... register("email", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email"/>
            {errors.email && (
              <p className="text-red-500">email requerido</p>
            )}
            <input type="password" {... register("password", {required : true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password"/>
            {errors.password && (
              <p className="text-red-500">password requerido</p>
            )}
            <button type="submit">Register</button>
        </form>
        <p className="flex gap-x-2 justify-between">
        Already Have an Account? <Link to="/login" className="text-sky-500">Login</Link>
        </p>
    </div>
    </div>
  )
}

export default RegisterPage