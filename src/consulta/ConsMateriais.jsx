import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsMateriais.css';
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const ConsMateriais = () => {
    return (
        <LayoutConsulta titleCons='Consulta Materiais'>
            <div className="informacoes-materiais">
                <FontAwesomeIcon icon={faPencil} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-materiais">
                    <h4>Nome Material:</h4>
                    <p>NoteBook Dell</p>
                </div>
                <div className="consulta-materiais">
                    <h4>Quantidade:</h4>
                    <p>10 NoteBooks Dell</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsMateriais;