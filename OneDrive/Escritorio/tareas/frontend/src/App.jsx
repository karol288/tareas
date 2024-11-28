import { BrowserRouter, Routes,Route } from "react-router-dom"; //libreria para el uso de las rutas
import { AuthProvider } from "./context/AuthContext";


import  LoginPage  from "./pages/loginPage";
import  RegistroPage from "./pages/registroPage";
import TareasPage from "./pages/TareasPages"
import TareasFormPage from "./pages/TareasForm";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
  
import  ProtectedRutas from "./ProtectedRutas";

function App(){
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element={<HomePage/>}></Route>
      <Route path= "/login" element={<LoginPage/>}></Route>
      <Route path= "/registro" element={<RegistroPage/>}></Route>


      <Route element={<ProtectedRutas/>}>
      <Route path= "/tareas" element={<TareasPage/>}></Route>
      <Route path= "/añadir-tarea" element={<TareasFormPage/>}></Route>
      <Route path= "/tareas/:id" element={<TareasFormPage/>}></Route>
      <Route path= "/perfil" element={<ProfilePage/>}></Route>
      </Route>

    </Routes>
    </BrowserRouter>
    </AuthProvider>
   
  )
}
export default App