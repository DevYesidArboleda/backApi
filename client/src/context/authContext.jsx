import { createContext, useContext, useState, useEffect } from "react";
import {  registerRequest, loginRequest, verifyTokenRequest, updateUserRequest } from "../api/auth";
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
  };

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try{
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        }
        catch (error){
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true);
            setUser(res.data);
            console.log(res)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };

    useEffect(() => {      
        if(errors.length > 0){
           const timer =  setTimeout(()=>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    const updateUser = async (id, user) => {
        try {
          await updateUserRequest(id, user);
        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(()=>{
        async function checkLogin (){
            const cookies = Cookies.get();
                if(!cookies.token){
                    setIsAuthenticated(false)
                    setLoading(false);
                    return setUser(null)
                }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data) return setIsAuthenticated(false);
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false);
                } catch (error) {
                    setIsAuthenticated(false)
                    setLoading(false);
                }
        }
        checkLogin()
    }, [])

    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            loading,
            isAuthenticated,
            errors,
            updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    )

}