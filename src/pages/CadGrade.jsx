import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import "../css/CadGrade.css";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const CadGrade = () => {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectDisciplina, setSelectDisciplina] = useState("");
  const [selectTurma, setSelectTurma] = useState("");
  const [nm_professor, setNm_professor] = useState("");
  const [nr_cargahoraria, setNr_cargahoraria] = useState("");
  const [qt_alunos, setQt_alunos] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const buscarDisciplina = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/consulta-disciplina",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.disciplinas;
      if (Array.isArray(data)) {
        setDisciplinas(data);
      } else {
        console.error("Formato inexperado do respose de municípios", data);
        setDisciplinas([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  const buscarTurma = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-turma", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.turmas;
      if (Array.isArray(data)) {
        setTurmas(data);
      } else {
        console.error("Formato inexperado do respose de municípios", data);
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
      buscarDisciplina();
      buscarTurma();
    }
  }, [isAuthenticated, navigate, buscarDisciplina, buscarTurma]);

  const handleSetTurma = (event) => {
    setSelectTurma(event.target.value);
    setError("");
  };

  const handleSetDisciplina = (event) => {
    setSelectDisciplina(event.target.value);
    setError("");
  };

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    switch (name) {
      case "nm_professor":
        setNm_professor(value);
        break;
      case "nr_cargahoraria":
        if (/^\d*$/.test(value)) {
            if(value <= 0 && value !== ""){
                setNr_cargahoraria(value);
              setError('Carga horária inválida!');
            }else{
                setNr_cargahoraria(value);
            }
          }
        break;
      case "qt_alunos":
        if (/^\d*$/.test(value)) {
            if(value <= 0 && value !== ""){
                setQt_alunos(value);
                setError('Quantidade de alunos inválida!');
            }else{
                setQt_alunos(value);
            }
          }
        break;
      default:
        break;
    }
  };

  const handleCadastroGrade = async () => {
    if(!selectDisciplina || !selectTurma || !nm_professor || !qt_alunos || !nr_cargahoraria){
        setError("Campos obrigatórios devem ser preenchidos!")
    }else{
        setError("")
    }

    const payload = {
      nm_professor: nm_professor,
      nr_cargahr: Number(nr_cargahoraria),
      qt_alunos: Number(qt_alunos),
      turma: {
        id_turma: Number(selectTurma),
      },
      disciplina: {
        id_disciplina: Number(selectDisciplina),
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/grade",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNm_professor("");
      setNr_cargahoraria("");
      setQt_alunos("");
      setSelectDisciplina("");
      setSelectTurma("");
      setError("");
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error)
    }
  };

  return (
    <Layout title="Cadastro de Grade" icon={faChalkboardUser} next="grade">
      <form className="ajustes-grade">
        <div>
          <label className={error && !selectDisciplina ? "titulo-inputs-grade-error" : "titulo-inputs-grade"}>Selecione a Disciplina</label>
          <select
            className="inputs-grade"
            id=""
            name="id_disciplina"
            value={selectDisciplina}
            onChange={handleSetDisciplina}
            required
          >
            <option value="">Selecione a disciplina</option>
            {disciplinas.map((disciplina) => (
              <option
                key={disciplina.id_disciplina}
                value={disciplina.id_disciplina}
              >
                {disciplina.nm_disciplina}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={error && !selectTurma ? "titulo-inputs-grade-error" : "titulo-inputs-grade"}>Selecione a Turma</label>
          <select
            className="inputs-grade"
            id=""
            name="id_turma"
            value={selectTurma}
            onChange={handleSetTurma}
            required
          >
            <option value="">Selecione a turma</option>
            {turmas.map((turma) => (
              <option key={turma.id_turma} value={turma.id_turma}>
                {turma.ds_turma} - {turma.curso.ds_curso}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={error && !nm_professor ? "titulo-inputs-grade-error" : "titulo-inputs-grade"}>Nome do Professor</label>
          <input
            className="inputs-grade"
            type="text"
            name="nm_professor"
            value={nm_professor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={error && !nr_cargahoraria ? "titulo-inputs-grade-error" : "titulo-inputs-grade"}>Carga Horária</label>
          <input
            className="inputs-grade"
            type="text"
            name="nr_cargahoraria"
            value={nr_cargahoraria}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={error && !qt_alunos ? "titulo-inputs-grade-error" : "titulo-inputs-grade"}>Quantidade de Alunos</label>
          <input
            className="inputs-grade"
            type="text"
            name="qt_alunos"
            value={qt_alunos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-error-button-disciplina">
        <text className={error ? "message-grade-error" : success ? "message-grade-success" : ""}>{"" || error || success}</text>
        <button
        disabled={!!error}
          className="botao-grade"
          type="button"
          onClick={handleCadastroGrade}
        >
          Gravar
        </button>
        </div>
      </form>
    </Layout>
  );
};

export default CadGrade;
