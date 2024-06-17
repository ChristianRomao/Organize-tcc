import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import "../css/CadDisciplina.css";
import Layout from "../components/Layout";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


const CadDisciplina = () => {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [nm_disciplina, setNm_disciplina] = useState('');

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);


  const handleChange = (event) => {
    setError("");
    setNm_disciplina(event.target.value)
  };

  const handleCadastroDisciplina = async () => {
    const payload = {
      nm_disciplina: nm_disciplina,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/disciplina",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNm_disciplina("");
      setError("")
        setSuccess(response.data.message);
        setTimeout(() =>{
          setSuccess("");
        },5000)
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error)
    }
  };

const validaCadastroDisciplina = () =>{
  if(!nm_disciplina){
    setError("Campos obrigatórios devem ser preenchidos!")
  }else{
  handleCadastroDisciplina();
  }
}

  return (
    <Layout
      title="Cadastro de Disciplina"
      icon={faBook}
      next="grade"
    >
      <form className="Ajustes">
        <div>
          <label className={error && !nm_disciplina ? "titulo-inputs-disciplina-error":"titulo-inputs-disciplina"}>Nome da Disciplina</label>
          <input
            className="inputs-disciplina"
            type="text"
            name="nm_disciplina"
            value={nm_disciplina}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-error-button-disciplina">
          <text className={error ? "message-disciplina-error" : success ? "message-disciplina-success" : ""}>{"" || error || success}</text>
          
          <button
            className="botao-disciplina"
            type="button"
            onClick={validaCadastroDisciplina}
          >
            Gravar
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CadDisciplina;
