import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CadInstituicao.css";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const CadInstituicao = () => {
  const token = localStorage.getItem("token");
  const [nm_razaosoc, setNm_razaosoc] = useState();
  const [cd_cpfcnpj, setCd_cpfcnpj] = useState();
  const [nm_fantasia, setNm_fantasia] = useState();

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    switch (name) {
      case "nm_razaosoc":
        setNm_razaosoc(value);
        break;
      case "cd_cpfcnpj":
        if (value.length <= 14 && /^\d*$/.test(value)) {
          setCd_cpfcnpj(value);
          }
        break;
      case "nm_fantasia":
        setNm_fantasia(value);
        break;
      default:
        break;
    }
  };

  const handleCadastroInst = async () => {
    const payload = {
      nm_razaosoc: nm_razaosoc,
      cd_cpfcnpj: cd_cpfcnpj,
      nm_fantasia: nm_fantasia,
    };

   try{ 
    const response = await axios.post("http://localhost:8080/instituicao", payload ,{headers:{
      Authorization: `Bearer ${token}`
    }}
  );
    setCd_cpfcnpj('');
    setNm_fantasia('');
    setNm_razaosoc('');
    console.log(response.data);
  }catch(error){
    console.log(error.response.data);

  }
};

  return (
    <Layout
      title="Cadastro de Instituição"
      icon={faBuildingColumns}
      next="polo"
    >
      <form className="Ajustes">
        <div>
          <label className="titulo-inputs-inst">Razão Social</label>
          <input
            className="inputs-inst"
            type="text"
            name="nm_razaosoc"
            value={nm_razaosoc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="titulo-inputs-inst">CPF/CNPJ</label>
          <input
            className="inputs-inst"
            type="text"
            name="cd_cpfcnpj"
            value={cd_cpfcnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="titulo-inputs-inst">Nome Fantasia</label>
          <input
            className="inputs-inst"
            type="text"
            name="nm_fantasia"
            value={nm_fantasia}
            onChange={handleChange}
            required
          />
        </div>
        <button className="botao-inst" type="button" onClick={handleCadastroInst}>
          Gravar
        </button>
      </form>
    </Layout>
  );
};

export default CadInstituicao;
