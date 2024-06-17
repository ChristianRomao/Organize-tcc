import { React, useCallback, useEffect, useState } from "react";
import "../css/CadMunicipio.css";
import Layout from "../components/Layout";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadMunicipio = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [estados, setEstados] = useState([]);
  const [selectEstado, setSelectEstado] = useState("");
  const [nm_municipio, setNm_municipio] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const buscarEstado = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/consulta-estado",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.estados;
      if (Array.isArray(data)) {
        setEstados(data);
      } else {
        console.error("Formato inexperado do respose de estados", data);
        setEstados([]);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarEstado();
    }
  }, [isAuthenticated, navigate, buscarEstado]);

  const handleSetEstado = (event) => {
    setError("");
    setSelectEstado(event.target.value);
  }

  const handleChange = (event) => {
    setError("");
    setNm_municipio(event.target.value)
  }

  const handleCadastrarMunicipio = async () =>{
    const codigoEstado = selectEstado.split(" ")[0];

    const payload = {
        nm_municipio: nm_municipio,
        estado:{
            cd_estado: codigoEstado
        }
    }
    try{
        const response = await axios.post("http://localhost:8080/municipio",payload,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        setNm_municipio('');
        setSelectEstado('');
        setError("")
        setSuccess(response.data.message);
        setTimeout(() =>{
          setSuccess("");
        },5000)
    }catch(error){
        console.log(error.response.data);
        setError(error.response.data.error)
    }
  }

  const validaCadastroMunicipio = () =>{
    if(!selectEstado || !nm_municipio){
      setError("Campos obrigatórios devem ser preenchidos!")
    }else{
    handleCadastrarMunicipio();
    }
  }

  return (
    <Layout
      title="Cadastro de MunicÍpio"
      icon={faLocationDot}
      next="instituicao"
    >
      <form className="ajustes-municipio">
        <div>
          <div>
            <label className={error && !selectEstado?"titulo-inputs-municipio-error":"titulo-inputs-municipio"}>Estado</label>
            <select
              className="inputs-municipio"
              id=""
              name="cd_estado"
              value={selectEstado}
              onChange={handleSetEstado}
              required
            >
              <option value="" hidden>Selecione uma Estado</option>
              {estados.map((estado) => (
                <option key={estado.id_estado} value={estado.id_estado}>
                  {estado.cd_estado} - {estado.nm_estado}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={error && !nm_municipio?"titulo-inputs-municipio-error":"titulo-inputs-municipio"}>Nome Município</label>
          <input
            className="inputs-municipio"
            type="text"
            name="nm_municipio"
            value={nm_municipio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-error-button">
          
        <text className={error ? "message-municipio-error" : success ? "message-municipio-success" : ""}>{"" || error || success}</text>
        <button className="botao-municipio" type="button" onClick={validaCadastroMunicipio}>
          Gravar
        </button>
        </div>
      </form>
    </Layout>
  );
};

export default CadMunicipio;
