import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsTurma.css';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const ConsTurma = () => {
    return (
        <LayoutConsulta titleCons='Consulta de Turmas'>
            <div className="botao-consulta-cursos">
                <button className="botao-aparece-cursos">Consultar Cursos</button>
            </div>
            <div className="informacoes-cursoturma">
                <FontAwesomeIcon icon={faGraduationCap} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-cursoturma">
                    <h4>Curso:</h4>
                    <p>Direito</p>
                </div>
                <div className="consulta-cursoturma">
                    <h4>Disciplina:</h4>
                    <p>Direito Penal</p>
                </div>
                <div className="consulta-cursoturma">
                    <h4>Turma:</h4>
                    <p>Turma 1 - 1º Periodo</p>
                </div>
                <div className="consulta-cursoturma">
                    <h4>Ano Letivo:</h4>
                    <p>2024</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsTurma;