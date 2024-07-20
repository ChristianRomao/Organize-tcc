import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsUsuario.css';
import { faSignal, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ConsUsuario = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [usuarios, setUsuarios] = useState([]);
    const [idUserDecode, setIdUserDecode] = useState("");

    const consultaUsuarios = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/usuario", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.usuarios;
            if (Array.isArray(data)) {
                setUsuarios(data);
            } else {
                console.error("Formato inexperado do respose de usuarios", data);
                setUsuarios([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaUsuarios();
            if(token){
                const decode = jwtDecode(token);
                setIdUserDecode(decode.id_usuario);
            }
        }
      }, [isAuthenticated, navigate, consultaUsuarios, token]);

    return (
        <LayoutConsulta titleCons='Consulta Usuários'>
            {usuarios.map((usuario) => (
                <div className="informacoes-usuario" key={usuario.id_usuario}>
                    <FontAwesomeIcon icon={faUser} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-usuario">
                        <h4>Usuário:</h4>
                        <p className="ajuste-textos" data-tooltip={usuario.nm_usuario}>{usuario.nm_usuario}</p>
                    </div>
                    <div className="consulta-usuario">
                        <h4>Email:</h4>
                        <p className="ajuste-textos" data-tooltip={usuario.ds_email}>{usuario.ds_email}</p>
                    </div>
                    <div className="consulta-usuario">
                        <h4>Função:</h4>
                        <p className="ajuste-textos">{usuario.ds_funcao === 'admin' ? 'Administrador' : 'Usuário'}</p>
                    </div>
                    <div className="icon-conectado">
                        <FontAwesomeIcon icon={faSignal} size="2x" style={idUserDecode === usuario.id_usuario ? {color:"#0f0"}:""}/>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsUsuario;