import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; //SIRVE PARA CUANDO YA ESTE AUTENTICADO LO REDIRECCIONE A UNA RUTA
import { Link } from "react-router-dom";


function RegistroPage(){

    const {register, handleSubmit, formState: {
        errors  //para extraer los errores 
    }} =useForm();
    const {signup, isAuthenticated, errors:RegisterErrors }= useAuth();
    const navigate = useNavigate()

    useEffect(() =>{
        if(isAuthenticated) navigate("/tareas"); //una vez autenticado podra pasar a la ruta de lo que son las tareas
 }, [ isAuthenticated]) 

    
    const onSumbit = handleSubmit (async values =>{
        signup(values)
         })
    
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
           {
                RegisterErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white "key={i}>
                        {error}
                    </div>
                ))
            }

             <form onSubmit={ onSumbit}> 

                <input type="text" {... register("nombre",{required:true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder="nombre de usuario" /> 
                {errors.nombre && (<p className="text-red-500"> nombre es requerido</p>) }

                <input type="email"  {... register("email",{required:true})} 
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                placeholder="correo electronico " />
                {errors.email && (<p className="text-red-500"> email es requerido</p>) }

                
                <input type="password"  {... register("password",{required:true})}
                 className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  
                 placeholder="contraseña"/>
                {errors.password && (<p className="text-red-500"> contraseña es requerido</p>) }


                <center><button type="submit" className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                crear cuenta</button></center> <br></br>
             </form>

             
            <p className="flex gap-x-2 justify-between text-white"> ¿ ya tienes una cuenta? 
            <Link to= "/login" className="text-sky-500"> iniciar sesion </Link></p>
        </div> 
            
           
        </div>
    )
}

export default RegistroPage