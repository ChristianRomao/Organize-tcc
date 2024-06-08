import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../consCss/ConsGrade.css';

const ConsGrade = () => {
    return (
        <LayoutConsulta titleCons='Consulta Grade'>
            <div className="informacoes-grade">
                <FontAwesomeIcon icon={faChalkboardUser} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-grade">
                    <h4>Disciplina:</h4>
                    <p>Java</p>
                </div>
                <div className="consulta-grade">
                    <h4>Turma:</h4>
                    <p>4º Periodo</p>
                </div>
                <div className="consulta-grade">
                    <h4>Ano Letivo:</h4>
                    <p>2023</p>
                </div>
                <div className="consulta-grade">
                    <h4>Professor:</h4>
                    <p>Jhonny</p>
                </div>
                <div className="consulta-grade">
                    <h4>Carga Horária:</h4>
                    <p>40 horas</p>
                </div>
                <div className="consulta-grade">
                    <h4>Quantidade de Alunos:</h4>
                    <p>50 Alunos</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsGrade;