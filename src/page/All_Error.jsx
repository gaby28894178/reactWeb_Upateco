
import { useNavigate } from "react-router-dom";


export const All_Error = () => {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Error 404</h1>
        <p>La página que estás buscando no existe.</p>
        <p>Por favor, verifica la URL o regresa a la página de inicio.</p>  
        <div>
          
          <img src="#" alt=" Imagen de error  404 " />
          
        </div>
      
        <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Volver al inicio
        </h3>
       
      
    </div>
  )
}
