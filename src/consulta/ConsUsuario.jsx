import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsUsuario.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ConsUsuario = () => {
    return (
        <LayoutConsulta titleCons='Consulta Usuários'>
            <div className="informacoes-usuario">
            <FontAwesomeIcon icon={faUser} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-usuario">
                    <h4>Usuário:</h4>
                    <p>Christian</p>
                </div>
                <div className="consulta-usuario">
                    <h4>Email:</h4>
                    <p>chritiangabriel4@gmail.com</p>
                </div>
                <div className="consulta-usuario">
                    <h4>Função:</h4>
                    <p>Administrador</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsUsuario;