import { faCube } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsBloco.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ConsBloco = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [blocos, setBlocos] = useState([]);

    const consultaBlocos = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/bloco", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.blocos;
            if (Array.isArray(data)) {
                setBlocos(data);
            } else {
                console.error("Formato inexperado do respose de bloco", data);
                setBlocos([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaBlocos();
        }
      }, [isAuthenticated, navigate, consultaBlocos]);

    return (
        <LayoutConsulta titleCons='Consulta Blocos'>
            {blocos.map((bloco) => (
                <div className="informacoes-bloco" key={bloco.id_bloco}>
                    <FontAwesomeIcon icon={faCube} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-bloco">
                        <h4>Polo:</h4>
                        <p>{bloco.polo.nm_polo}</p>
                    </div>
                    <div className="consulta-bloco">
                        <h4>Bloco:</h4>
                        <p>{bloco.nm_bloco}</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsBloco;