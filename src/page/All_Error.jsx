import { useNavigate } from "react-router-dom";

export const All_Error = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "3rem", color: "#dc3545", margin: "0 0 10px" }}>Error 404</h1>
      <p style={{ fontSize: "1.2rem", color: "#333", margin: "0 0 8px" }}>La página que estás buscando no existe.</p>
      <p style={{ color: "#666", margin: "0 0 24px" }}>Por favor, verifica la URL o regresa a la página de inicio.</p>  
      
      <div style={{ margin: "20px 0" }}>
        <img 
          src="https://unsplash.com" 
          alt="Página no encontrada" 
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", maxHeight: "300px" }}
        />
      </div>
    
      <button 
        onClick={() => navigate("/")} 
        style={{ 
          cursor: "pointer", 
          backgroundColor: "#007bff", 
          color: "#fff", 
          border: "none", 
          padding: "10px 20px", 
          fontSize: "1rem", 
          borderRadius: "5px",
          marginTop: "15px",
          transition: "background-color 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
      >
        Volver al inicio
      </button>
    </div>
  );
};
