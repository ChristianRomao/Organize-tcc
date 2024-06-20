import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsTurma.css';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ConsTurma = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [turmas, setTurmas] = useState([]);

    const consultaTurmas = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/turma", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.turmas;
            if (Array.isArray(data)) {
                setTurmas(data);
            } else {
                console.error("Formato inexperado do respose de turmas", data);
                setTurmas([]);
            }
        } catch (error) {
          console.log(error.response.data);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaTurmas();
        }
      }, [isAuthenticated, navigate, consultaTurmas]);

    return (
        <LayoutConsulta titleCons='Consulta de Turmas'>
            <div className="botao-consulta-cursos">
                <button className="botao-aparece-cursos">Consultar Cursos</button>
            </div>
            {turmas.map((turma) => (
                <div className="informacoes-turma" key={turma.id_turma}>
                    <FontAwesomeIcon icon={faGraduationCap} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-turma">
                        <h4>Curso:</h4>
                        <p className="ajuste-textos">{turma.curso.ds_curso}</p>
                    </div>
                    <div className="consulta-turma">
                        <h4>Disciplina:</h4>
                        <p>{}</p>
                    </div>
                    <div className="consulta-turma">
                        <h4>Turma:</h4>
                        <p>Turma 1 - 1º Periodo</p>
                    </div>
                    <div className="consulta-turma">
                        <h4>Ano Letivo:</h4>
                        <p>2024</p>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
    );
}

export default ConsTurma;