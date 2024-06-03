import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsInstituicao.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsInstituicao = () => {
    return (
        <LayoutConsulta titleCons='Consulta Instituição'>
            <div className="informacoes-inst">
                <FontAwesomeIcon icon={faBuildingColumns} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-instituicao">
                    <h4>Razão social:</h4>
                    <p>Centro Universitário Integrado</p>
                </div>
                <div className="consulta-instituicao">
                    <h4>CNPJ:</h4>
                    <p>1234567890009</p>
                </div>
                <div className="consulta-instituicao">
                    <h4>Nome Fantasia:</h4>
                    <p>Integrado</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsInstituicao;