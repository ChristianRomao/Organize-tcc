import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import '../consCss/ConsPolo.css';
import { useAuth } from "../AuthProvider";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsPolo = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [polos, setPolos] = useState([]);

    const consultaPolos = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/polo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.polos;
            if (Array.isArray(data)) {
                setPolos(data);
            } else {
                console.error("Formato inexperado do respose de polo", data);
                setPolos([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaPolos();
        }
      }, [isAuthenticated, navigate, consultaPolos]);

    return (
        <LayoutConsulta titleCons='Consulta Polos'>
            {polos.map((polo) => (
                <div className="informacoes-polo" key={polo.id_polo}>
                <FontAwesomeIcon icon={faLocationDot} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-polo">
                        <h4>Instituição:</h4>
                        <p className="ajuste-textos" data-tooltip={polo.instituicao.nm_fantasia}>{polo.instituicao.nm_fantasia}</p>
                    </div>
                    <div className="consulta-polo">
                        <h4>Municipio:</h4>
                        <p className="ajuste-textos" data-tooltip={`${polo.municipio.nm_municipio} - ${polo.municipio.estado_cd}`}>
                            {polo.municipio.nm_municipio} - {polo.municipio.estado_cd}
                        </p>
                    </div>
                    <div className="consulta-polo">
                        <h4>Polo:</h4>
                        <p className="ajuste-textos" data-tooltip={polo.nm_polo}>{polo.nm_polo}</p>
                    </div>
                    <div className="consulta-polo">
                        <h4>Endereço:</h4>
                        <p className="ajuste-textos" data-tooltip={polo.ds_endereco}>{polo.ds_endereco}</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsPolo;