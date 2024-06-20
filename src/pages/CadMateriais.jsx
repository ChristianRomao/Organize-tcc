import { useNavigate } from "react-router-dom";
import HeaderComponents from "../components/HeaderComponents";
import "../css/CadMateriais.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import axios from "axios";

const CadMateriais = () => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [ds_material, setDs_material] = useState("");
  const [qt_material, setQt_material] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false)

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const buscarMateriais = useCallback(async (search) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/consulta-material/${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.materiais;
      if (Array.isArray(data)) {
        setMateriais(data);
        console.log(data);
        setError("");
      } else {
        console.error("Formato inexperado do respose de materiais", data);
        setMateriais([]);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      if(search.trim() === ""){
        buscarMateriais('');
      }else{
        buscarMateriais(search);
      }
    }
  }, [isAuthenticated, navigate, buscarMateriais,search]);

  const handleGravar = () => {
    if(!ds_material || !qt_material || qt_material === '' || qt_material === 0){
      setError("Campos obrigatórios devem ser preenchidos!")
    }else{
      setError("")
    }
    console.log(error)
    const descricaoInseridaLowercase = ds_material.toLowerCase();

    const descricaoExistente = materiais.some(material => material.ds_material.toLowerCase() === descricaoInseridaLowercase);
    
    if (descricaoExistente && !error) {
      setShowAlert(true);
    } else if(!error){
      handleCadastroMaterial();
    }
  }

const handleConfirmAlert = (confirm) => {
  if (confirm) {
    handleCadastroMaterial();
  } else {
      setShowAlert(false);
  }
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError('');
    setShowAlert(false)
    switch (name) {
      case "ds_material":
        if(value){}
        setDs_material(value);
        setSearch(value);
        break;
      case "qt_material":
        if (/^\d*$/.test(value)) {
          if(value <= 0 && value !== ""){
            setQt_material(value);
            setError('Quantidade inválida!');
          }else{
            setQt_material(value);
          }
        }
        break;
      case "search":
        setSearch(value);
        break;
      default:
        break;
    }
  };

  const handleCadastroMaterial = async () => {
    
    const payload = {
      ds_material: ds_material,
      qt_material: Number(qt_material)
    };

    try {
      const response = await axios.post("http://localhost:8080/material", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDs_material("");
      setQt_material("");
      setShowAlert(false);
      buscarMateriais("")
      setSuccess(response.data.message)
      setTimeout(() =>{
        setSuccess('');
      },5000)
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);

    }
  };

  return (
    <div className="tudo">
      <HeaderComponents />
      <body className="materiais-home">
        <div className="materiais-body">
          <div>
            <button className="voltaHome">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate(-1)}
              >
                Voltar
              </p>
            </button>
            <button className="vaiConsulta">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate("/cadastro-curso-turma")}
              >
                Próximo
              </p>
            </button>
          </div>
          <div className="body-content">
            <div className="cadastro-materiais">
              <div className="titulo-materiais-div">
                <text className="titulo-materiais">Cadastro de Materiais</text>
              </div>
              <div className="body-content-form">
                <div className="icon-content">
                  <FontAwesomeIcon icon={faPen} />
                </div>
                <div>
                  <form className="ajustes-materiais">
                    <div>
                    <label className={error && !ds_material ?"titulo-inputs-materiais-error":"titulo-inputs-materiais"}>
                        Descrição do Material
                      </label>
                      <input
                        placeholder="Descrição do material"
                        className="inputs-materiais"
                        type="text"
                        name="ds_material"
                        value={ds_material}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className={error && !qt_material ? "titulo-inputs-materiais-error":"titulo-inputs-materiais"}>
                        Quantidade
                      </label>
                      <input
                        placeholder="Quantidade de material"
                        className="inputs-materiais"
                        type="text"
                        name="qt_material"
                        value={qt_material}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <text className={error ? "message-materiais-error" : success ? "message-materiais-success" : ""}>{"" || error || success}</text>
                    <button
                      disabled={!!error && !qt_material}
                      className="botao-materiais"
                      type="button"
                      onClick={handleGravar}
                    >
                      Gravar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="descricao-materiais">
              <div className="header-descricao">
                <text className="titulo-descricao-materiais">Materiais no Estoque</text>
                <input type="search" className="search-descricao" placeholder="Buscar pela descrição" name="search" value={search} onChange={handleChange}/>
              </div>
              <div className="content">
                {materiais.map((material) => (
                  <div key={material.id_material} className="material-item">
                    <h3>{material.ds_material}</h3>
                    <p>Quantidade: {material.qt_material}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
      {showAlert && !error &&(
                <div className="gravar-alert-overlay">
                    <div className="gravar-alert">
                        <div className="gravar-alert-body">
                            <h1>ATENÇÃO!</h1>
                            <p>Já possui(em) dado(s) com essa descrição.<br/>Deseja gravar mesmo assim?</p>
                            <div className="gravar-alert-button-group">
                                <button onClick={() => handleConfirmAlert(true)}>Sim</button>
                                <button onClick={() => handleConfirmAlert(false)}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
};

export default CadMateriais;
