import { React, useCallback, useEffect, useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../css/CadPolos.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import Layout from "../components/Layout";

const CadPolos = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [instituicoes, setInstituicoes] = useState([]);
  const [selectInstituicao, setSelectInstituicao] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [selectMunicipio, setSelectMunicipio] = useState("");
  const [nm_polo, setNm_polo] = useState("");
  const [ds_endereco, setDs_endereco] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const buscarInstituicao = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-instituicao", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.instituicoes;
      if (Array.isArray(data)) {
        setInstituicoes(data);
      } else {
        console.error("Formato inexperado do respose de instituição", data);
        setInstituicoes([]);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [token]);

  const buscarMunicipio = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-municipio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.municipios;
      if (Array.isArray(data)) {
        setMunicipios(data);
      } else {
        console.error("Formato inexperado do respose de municípios", data);
        setMunicipios([]);
      }
    } catch (error) {
      setError(error.response.data.error);

    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarInstituicao();
      buscarMunicipio();
    }
  }, [isAuthenticated, navigate, buscarInstituicao, buscarMunicipio]);


  const handleSetInstituicao = (event) => {
    setError("");
    setSelectInstituicao(event.target.value);
  };

  const handleSetMunicipio = (event) => {
    setError("");
    setSelectMunicipio(event.target.value);
  };

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    switch (name) {
      case "nm_polo":
        setNm_polo(value);  
        break;
      case "ds_endereco":
        setDs_endereco(value);
        break;
      default:
        break;
    }
  };

  const handleCadastroPolo = async () => {
    const payload = {
      nm_polo: nm_polo,
      ds_endereco: ds_endereco,
      instituicao: {
        id_instituicao: Number(selectInstituicao),
      },
      municipio: {
        id_municipio: Number(selectMunicipio),
      },
    };
    try {
      const response = await axios.post("http://localhost:8080/polo", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNm_polo('');
      setDs_endereco('');
      setSelectInstituicao('');
      setSelectMunicipio('');
      setError("")
      setSuccess(response.data.message);
      setTimeout(() =>{
        setSuccess("");
      },5000)
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const validaCadastroPolo = () =>{
    if(!selectInstituicao || !selectMunicipio || !nm_polo || !ds_endereco){
      setError("Campos obrigatórios devem ser preenchidos!")
    }
      handleCadastroPolo()
  }

  return (
    <Layout title="Cadastro de Polo" icon={faLocationDot} next="bloco">
      <form className="ajustes-polo">
        <div>
          <div>
            <label className={error && !selectInstituicao?"titulo-inputs-polo-error":"titulo-inputs-polo"}>Instituição</label>
            <select
              className="inputs-polo"
              id=""
              name="id_instituicao"
              value={selectInstituicao}
              onChange={handleSetInstituicao}
              required
            >
              <option value="" hidden>Selecione uma Instituição</option>
              {instituicoes.map((instituicao) => (
                <option
                  key={instituicao.id_instituicao}
                  value={instituicao.id_instituicao}
                >
                  {instituicao.nm_fantasia}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={error && !selectMunicipio?"titulo-inputs-polo-error":"titulo-inputs-polo"}>Município</label>
          <select
            className="inputs-polo"
            id=""
            name="id_municipio"
            value={selectMunicipio}
            onChange={handleSetMunicipio}
            required
          >
            <option value="" hidden>Selecione um Município</option>
            {municipios.map((municipio) => (
              <option
                key={municipio.id_municipio}
                value={municipio.id_municipio}
              >
                {municipio.nm_municipio} - {municipio.estado.cd_estado}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={error && !nm_polo?"titulo-inputs-polo-error":"titulo-inputs-polo"}>Nome do Polo</label>
          <input
            className="inputs-polo"
            type="text"
            name="nm_polo"
            value={nm_polo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={error && !ds_endereco?"titulo-inputs-polo-error":"titulo-inputs-polo"}>Endereço do Local</label>
          <input
            className="inputs-polo"
            type="text"
            name="ds_endereco"
            value={ds_endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-error-button">
          <text className={error ? "message-polo-error" : success ? "message-polo-success" : ""}>{"" || error || success}</text>
          <button
            className="botao-polo"
            type="button"
            onClick={validaCadastroPolo}
          >
            Gravar
          </button>
          </div>
      </form>
    </Layout>
  );
};

export default CadPolos;
