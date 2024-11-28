import { useForm} from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage(){
    const {register,handleSubmit, formState: {errors},}= useForm()
    const {signin, errors: signinErrors} = useAuth()

    const onSubmit =handleSubmit((data)=>{ //va a devolver los datos
        signin(data);
        
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center"> 
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

        {signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2 "key={i}>
                {error}
                </div>
            ))}
            

            <h1 className="text-2xl font-bold  text-white">login</h1>

           <form onSubmit={ onSubmit}> 
            <input type="email"  {... register("email",{required:true})} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
            placeholder="correo electronico " />
            {errors.email && (<p className="text-red-500"> email es requerido</p>) }
            
            
            <input type="password"  {... register("password",{required:true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  
            placeholder="contraseña"/>
            {errors.password && (<p className="text-red-500"> contraseña es requerido</p>) }
            
      
            <center><button type="submit"  className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                ingresar</button></center>

        
            </form>

            <p className="flex gap-x-2 justify-between text-white"> ¿Aun no tienes una cuenta? 
            <Link to= "/registro" className="text-sky-500"> crear cuenta</Link></p>
        </div>

        </div>
    )
}

export default LoginPage