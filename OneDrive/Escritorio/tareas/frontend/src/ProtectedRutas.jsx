import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRutas(){
    const {user, isAuthenticated}=useAuth()
    if (!isAuthenticated)return <Navigate to="/login" replace ></Navigate> // se le pone replace para que no vuelva a la ruta anterior 
    
    return ( //oulet es por si el usuario si esta autenticado continue con el componente que esta adentro
        <Outlet>


        </Outlet>
    )
}

export default ProtectedRutas