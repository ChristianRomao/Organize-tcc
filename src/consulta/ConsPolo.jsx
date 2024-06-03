import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import '../consCss/ConsPolo.css';

const ConsPolo = () => {
    return (
        <LayoutConsulta titleCons='Consulta Polo'>
            <div className="informacoes-polo">
                <FontAwesomeIcon icon={faLocationDot} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-polo">
                    <h4>Instituição:</h4>
                    <p>Centro Universitario Integrado</p>
                </div>
                <div className="consulta-polo">
                    <h4>Municipio:</h4>
                    <p>Campo Mourão</p>
                </div>
                <div className="consulta-polo">
                    <h4>Polo:</h4>
                    <p>Centro</p>
                </div>
                <div className="consulta-polo">
                    <h4>Endereço:</h4>
                    <p>Rua Não Sei 5421</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsPolo;