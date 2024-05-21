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
      console.log(error.response.data);
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
      console.log(error.response.data);
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
    setSelectInstituicao(event.target.value);
  };

  const handleSetMunicipio = (event) => {
    setSelectMunicipio(event.target.value);
  };

  const handleChange = (event) => {
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
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Layout title="Cadastro de Polo" icon={faLocationDot} next="bloco">
      <form className="ajustes-polo">
        <div>
          <div>
            <label className="titulo-inputs-polo">Instituição</label>
            <select
              className="inputs-polo"
              id=""
              name="id_instituicao"
              value={selectInstituicao}
              onChange={handleSetInstituicao}
              required
            >
              <option value="">Selecione uma Instituição</option>
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
          <label className="titulo-inputs-polo">Município</label>
          <select
            className="inputs-polo"
            id=""
            name="id_municipio"
            value={selectMunicipio}
            onChange={handleSetMunicipio}
            required
          >
            <option value="">Selecione um Município</option>
            {municipios.map((municipio) => (
              <option
                key={municipio.id_municipio}
                value={municipio.id_municipio}
              >
                {municipio.nm_municipio}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="titulo-inputs-polo">Nome do Polo</label>
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
          <label className="titulo-inputs-polo">Endereço do Local</label>
          <input
            className="inputs-polo"
            type="text"
            name="ds_endereco"
            value={ds_endereco}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="botao-polo"
          type="button"
          onClick={handleCadastroPolo}
        >
          Gravar
        </button>
      </form>
    </Layout>
  );
};

export default CadPolos;
