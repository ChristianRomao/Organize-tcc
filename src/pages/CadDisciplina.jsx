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

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);


  const handleChange = (event) => {
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
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Layout
      title="Cadastro de Disciplina"
      icon={faBook}
      next="grade"
    >
      <form className="Ajustes">
        <div>
          <label className="titulo-inputs-disciplina">Nome da Disciplina</label>
          <input
            className="inputs-disciplina"
            type="text"
            name="nm_disciplina"
            value={nm_disciplina}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="botao-disciplina"
          type="button"
          onClick={handleCadastroDisciplina}
        >
          Gravar
        </button>
      </form>
    </Layout>
  );
};

export default CadDisciplina;
