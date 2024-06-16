import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../consCss/ConsGrade.css';
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConsGrade = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [grades, setGrades] = useState([]);

    const consultaGrade = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/grade", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.grades;
            if (Array.isArray(data)) {
                setGrades(data);
            } else {
                console.error("Formato inexperado do respose de grade", data);
                setGrades([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaGrade();
        }
      }, [isAuthenticated, navigate, consultaGrade]);

    return (
        <LayoutConsulta titleCons='Consulta Turmas'>
            {grades.map((grade) => (
                <div className="informacoes-grade">
                    <FontAwesomeIcon icon={faChalkboardUser} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-grade">
                        <h4>Turma:</h4>
                        <p className="ajuste-textos" data-tooltip={`${grade.disciplina.nm_disciplina} - ${grade.turma.curso.ds_curso}`}>
                            {grade.turma.curso.ds_curso} - {grade.disciplina.nm_disciplina}
                        </p>
                    </div>
                    <div className="consulta-grade">
                        <h4>Ano Letivo:</h4>
                        <p className="ajuste-textos">{grade.turma.nr_anoletivo}</p>
                    </div>
                    <div className="consulta-grade">
                        <h4>Disciplina:</h4>
                        <p className="ajuste-textos">{grade.disciplina.nm_disciplina}</p>
                    </div>
                    <div className="consulta-grade">
                        <h4>Professor:</h4>
                        <p className="ajuste-textos">{grade.nm_professor}</p>
                    </div>
                    <div className="consulta-grade">
                        <h4>Carga Horária:</h4>
                        <p className="ajuste-textos">{grade.nr_cargaHr} hr</p>
                    </div>
                    <div className="consulta-grade">
                        <h4>Qt. Alunos:</h4>
                        <p className="ajuste-textos">{grade.qt_alunos} alunos</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsGrade;