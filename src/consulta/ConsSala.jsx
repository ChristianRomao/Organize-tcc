import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../consCss/ConsSala.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ConsSala = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [salas, setSalas] = useState([]);

    const consultaSalas = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/sala", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.salas;
            if (Array.isArray(data)) {
                setSalas(data);
            } else {
                console.error("Formato inexperado do respose de sala", data);
                setSalas([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaSalas();
        }
      }, [isAuthenticated, navigate, consultaSalas]);

    return (
        <LayoutConsulta titleCons='Consulta Salas'>
            {salas.map((sala) => (
                <div className="informacoes-sala" key={sala.id_sala }>
                    <FontAwesomeIcon icon={faDoorOpen} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-sala">
                        <h4>Bloco - Polo:</h4>
                        <p>{sala.bloco.nm_bloco} - {sala.bloco.polo.nm_polo}</p>
                    </div>
                    <div className="consulta-sala">
                        <h4>Sala:</h4>
                        <p>{sala.nm_sala}</p>
                    </div>
                    <div className="consulta-sala">
                        <h4>Capacidade Vigilância:</h4>
                        <p>{sala.qt_capacvigilancia} Pessoas</p>
                    </div>
                    <div className="consulta-sala">
                        <h4>Materiais em Sala:</h4>
                        <p>4 Materiais</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsSala;