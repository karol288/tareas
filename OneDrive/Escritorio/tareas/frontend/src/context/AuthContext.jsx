//para guardar los datos de autenticacion del usuario

import {createContext , useContext, useState, useEffect} from "react";
import { registroPedido, loginPedido, verificarTokenPedido} from "../api/auth";
import cookies from "js-cookie"; //para leer las cookies desde el frontend libreria 

export const AuthContext = createContext()

// useAuth es para que importe ya de una ver todo lo que esta en la etiqueta de <AuthContext.Provider> y no estar importando los authContext y AuthProvider
export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth deberia estar dentro de un provider");
    } 
    return context;
    
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors,setErrors] = useState([]);


    const signup= async (user) =>{
        try {
        const res = await registroPedido(user)
        console.log("Usuario registrado:",res.data)
        setUser(res.data) 
        setIsAuthenticated(true)
        } catch (error) {
            // console.log(error.response);
            
            setErrors(error.response.data)
        }
    }

    const signin = async (user) =>{
        try {
            const res =await loginPedido(user)
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data) //guarda los datos del usuario
            
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    // contador para que se quite el mensaje de los errores

    useEffect(() => {
        if (errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([]) // esto es para que quite los errores y lo deje nuevamente
            },5000)
            return () => clearTimeout(timer) //limpia el timer que estaba
        }})

    useEffect(()=>{
        async function checkLogin  () {
            const cookiesToken = cookies.get()
        console.log(cookiesToken);
        
        if(!cookiesToken.token){
            setIsAuthenticated(false);
            setUser(null);
            return;
        }
            
            try {
           const res = await verificarTokenPedido(cookiesToken.token);
           console.log(res);
           if (!res.data) return setIsAuthenticated(false)
            
            setIsAuthenticated(true) //si esta autenticado
            setUser(res.data)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
            }
            }
        
        checkLogin()
        }, [])

    return (
        //aca los que esten dentro de este contexto van a poder llamar datos del usuario como a singup
        <AuthContext.Provider
         value={{

            signup,
            signin,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>

    )
}
