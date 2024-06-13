import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsMateriais.css';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ConsMateriais = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [materiais, setMateriais] = useState([]);

    const consultaMateriais = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/material", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.materiais;
            if (Array.isArray(data)) {
                setMateriais(data);
            } else {
                console.error("Formato inexperado do respose de materiais", data);
                setMateriais([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaMateriais();
        }
      }, [isAuthenticated, navigate, consultaMateriais]);

    return (
        <LayoutConsulta titleCons='Consulta Materiais'>
            {materiais.map((material) => (
                <div className="informacoes-materiais" key={material.id_material}>
                    <FontAwesomeIcon icon={faPencil} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-materiais">
                        <h4>Nome Material:</h4>
                        <p>{material.ds_material}</p>
                    </div>
                    <div className="consulta-materiais">
                        <h4>Quantidade:</h4>
                        <p>{material.qt_material} materiais</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsMateriais;