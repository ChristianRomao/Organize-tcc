import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../css/CadBlocos.css";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadBlocos = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [polos, setPolos] = useState([]);
  const [selectPolo, setSelectPolo] = useState("");
  const [nm_bloco, setNm_bloco] = useState("");

  const buscarPolo = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-polo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.polos;
      if (Array.isArray(data)) {
        setPolos(data);
      } else {
        console.error("Formato inexperado do respose de polo", data);
        setPolos([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarPolo();
    }
  }, [isAuthenticated, navigate, buscarPolo]);

  const handleSetPolo = (event) => {
    setSelectPolo(event.target.value);
  };

  const handleChange = (event) => {
    setNm_bloco(event.target.value);
  };

  const handleCadastroBloco = async () => {
    const payload = {
      nm_bloco: nm_bloco,
      polo: {
        id_polo: Number(selectPolo),
      }
    };
    try {
      const response = await axios.post("http://localhost:8080/bloco", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Layout title="Cadastro de Bloco" icon={faCube} next="sala">
      <form className="ajustes-bloco">
        <div>
          <label className="titulo-inputs-bloco">Polo</label>
          <select
            className="select-bloco"
            id=""
            name="id_polo"
            value={selectPolo}
            onChange={handleSetPolo}
            required
          >
            <option value="">Selecione um polo</option>
            {polos.map((polo) => (
                <option
                  key={polo.id_polo}
                  value={polo.id_polo}
                >
                  {polo.nm_polo}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="titulo-inputs-bloco">Nome do Bloco</label>
          <div className="grid">
            <input
              className="input-bloco"
              type="text"
              name="nm_bloco"
              value={nm_bloco}
              onChange={handleChange}
              required
            />
            <button
              className="adiciona-polo"
              type="submit"
              onClick={handleCadastroBloco}
            >
              Adicionar
            </button>
          </div>
        </div>
        <button
          className="botao-bloco"
          type="submit"
          onClick={handleCadastroBloco}
        >
          Gravar
        </button>
      </form>
    </Layout>
  );
};

export default CadBlocos;
