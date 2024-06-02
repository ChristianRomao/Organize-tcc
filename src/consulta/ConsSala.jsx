import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../consCss/ConsSala.css'

const ConsSala = () => {
    return (
        <LayoutConsulta titleCons='Consulta Salas'>
            <div className="informacoes-sala">
                <FontAwesomeIcon icon={faDoorOpen} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-sala">
                    <h4>Bloco - Polo:</h4>
                    <p>Bloco C - Unidade Centro</p>
                </div>
                <div className="consulta-sala">
                    <h4>Sala:</h4>
                    <p>C 2</p>
                </div>
                <div className="consulta-sala">
                    <h4>Capacidade Vigilância:</h4>
                    <p>100 pessoas</p>
                </div>
                <div className="consulta-sala">
                    <h4>Materiais em Sala:</h4>
                    <p>4 Materiais</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsSala;