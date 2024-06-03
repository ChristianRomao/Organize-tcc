import { faCube } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsBloco.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsBloco = () => {
    return (
        <LayoutConsulta titleCons='Consulta Blocos'>
            <div className="informacoes-bloco">
                <FontAwesomeIcon icon={faCube} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-bloco">
                    <h4>Polo:</h4>
                    <p>Centro</p>
                </div>
                <div className="consulta-bloco">
                    <h4>Bloco:</h4>
                    <p>Bloco A</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsBloco;