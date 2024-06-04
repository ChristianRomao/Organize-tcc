import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { useCallback, useEffect, useRef, useState } from "react";
import "../css/CadSala.css";
import ModalComponent from "../components/ModalComponent";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadSala = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [blocos, setBlocos] = useState([]);
  const [selectBloco, setSelectBloco] = useState("");
  const [nm_sala, setNm_sala] = useState("");
  const [qt_capacvigilancia, setQt_capacvigilancia] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowToolTip] = useState(false);
  const hoverTimeout = useRef(null);

  const [idSalaStored, setIdSalaStored] = useState("");
  const [nm_SalaStored, setNm_SalaStored] = useState("");

  const [materiais, setMateriais] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState("");
  const [qt_materialSala, setQt_materialSala] = useState("");
  const [ds_materialSala, setDs_materialSala] = useState("");

  const [errorSala, setErrorSala] = useState("");
  const [error, setError] = useState(false);
  const [successSala, setSuccessSala] = useState("");
  const [errorMaterial, setErrorMaterial] = useState("");
  const [successMaterial, setSuccessMaterial] = useState("");
  
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const buscarBloco = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-bloco", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.blocos;
      if (Array.isArray(data)) {
        setBlocos(data);
      } else {
        console.error("Formato inexperado do respose de bloco", data);
        setBlocos([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  const buscarMateriais = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/consulta-material",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.materiais;
      console.log(data);
      if (Array.isArray(data)) {
        setMateriais(data);
    } else {
        console.error("Formato inexperado do respose de materiais", data);
        setMateriais([]);
    }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarBloco();
    }
  }, [isAuthenticated, navigate, buscarBloco]);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowToolTip(false);
  };

  const handleCloseModal = () => {
    setShowConfirmAlert(true)
  };

  const handleSetBloco = (event) => {
    setErrorSala("");
    setSelectBloco(event.target.value);
  };

  const handleSetMaterial = (event) => {
    setSelectMaterial(event.target.value);
    setErrorMaterial("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorSala("");
    setErrorMaterial("");
    switch (name) {
      case "nm_sala":
        setNm_sala(value);
        break;
      case "qt_capacvigilancia":
        if (/^\d*$/.test(value)) {
          if (value <= 0 && value !== "") {
            setQt_capacvigilancia(value);
            setErrorSala("Quantidade inválida!");
          } else {
            setQt_capacvigilancia(value);
          }
        }
        break;
      case "qt_materialSala":
        if (/^\d*$/.test(value)) {
          if (value <= 0 && value !== "") {
            setQt_materialSala(value);
            setErrorMaterial("Quantidade inválida!");
          } else {
            setQt_materialSala(value);
          }
        }
        break;
      case "ds_materialSala":
        setDs_materialSala(value)
        console.log(selectMaterial)
        break;
      default:
        break;
    }
  };

  const handleConfirmClose = (confirm) => {
    if (confirm) {
      setIsModalOpen(false);
      setQt_materialSala("");
      setSelectMaterial("");
      // setIdSalaStored("");
      setShowConfirmAlert(false)
    } else {
      setShowConfirmAlert(false)
    }
  }

  const validaCadastroSala = (type) => {
    if (!selectBloco || !nm_sala || !qt_capacvigilancia) {
      setErrorSala("Campos obrigatórios devem ser preenchidos!");
      setError(true);
    } else {
      setErrorSala("");
      setError(false);
    }

    if (type === "sala") {
      handleCadastroSala();
    } else if (type === "material") {
      handleClickCadMateriais();
    }
  };

  const validaCadastroMaterial = () =>{
    let materialErro = false;

    if(!selectMaterial || !qt_materialSala || qt_materialSala === ""){
      setErrorMaterial("Campos obrigatórios devem ser preenchidos!");
      materialErro = true;
    } else {
      setErrorMaterial("");
      materialErro = false;
    }

    setIsModalOpen(true)

    if(!materialErro){
      handleCadastroMaterialSala()
    }
  }

  const handleCadastroSala = async () => {
    if (!errorSala) {
      const payload = {
        nm_sala: nm_sala,
        qt_capacvigilancia: Number(qt_capacvigilancia),
        bloco: {
          id_bloco: Number(selectBloco),
        },
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/sala",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNm_SalaStored(nm_sala);
        setNm_sala("");
        setQt_capacvigilancia("");
        setSelectBloco("");
        setErrorSala("");
        setSuccessSala(response.data.message);
        console.log(response.data.sala);
        setTimeout(() => {
          setSuccessSala("");
        }, 5000);
        const newSalaId = response.data.sala.id_sala;
        setIdSalaStored(newSalaId);
      } catch (error) {
        console.log(error.response.data);
        setErrorSala(error.response.data.error);
        setError(true);
      }
    }
  };

  const handleCadastroMaterialSala = async () => {
    if (!errorMaterial) {
      const payload = {
        qt_materialSala: Number(qt_materialSala),
        ds_materialSala: ds_materialSala,
        material: {
          id_material: Number(selectMaterial),
        },
        sala: {
          id_sala: Number(idSalaStored),
        },
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/materialsala",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectMaterial("");
        setQt_materialSala("");
        setDs_materialSala("");
        setErrorMaterial("");
        setSuccessMaterial(response.data.message);
        console.log(response.data.sala);
        setTimeout(() => {
          setSuccessMaterial("");
        }, 5000);
        await buscarMateriais();
      } catch (error) {
        console.log(error.response.data);
        setErrorMaterial(error.response.data.error);
      }
    }
  };

  const handleClickCadMateriais = async () => {
    setNm_SalaStored("");
    setIdSalaStored("");
    setErrorMaterial("");
    try {
      await handleCadastroSala();
      setIsModalOpen(true);
      await buscarMateriais();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
    <Layout title="Cadastro de Sala" icon={faDoorOpen} next="materiais">
      <form className="ajustes-sala">
        <div>
          <label className={errorSala && !selectBloco ? "titulo-inputs-sala-error" : "titulo-inputs-sala"}>Bloco - Polo</label>
          <select
            className="select-sala"
            id=""
            name="id_bloco"
            value={selectBloco}
            onChange={handleSetBloco}
          >
            <option value="">Selecione um bloco</option>
            {blocos.map((bloco) => (
              <option key={bloco.id_bloco} value={bloco.id_bloco}>
                {bloco.nm_bloco} - {bloco.polo.nm_polo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={errorSala && !nm_sala ? "titulo-inputs-sala-error" : "titulo-inputs-sala"}>Nome da Sala</label>
          <input
            className="inputs-sala"
            type="text"
            name="nm_sala"
            value={nm_sala}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className={errorSala && !qt_capacvigilancia ? "titulo-inputs-sala-error" : "titulo-inputs-sala"}>Capacidade Vigilância</label>
          <input
            className="inputs-sala"
            type="text"
            name="qt_capacvigilancia"
            value={qt_capacvigilancia}
            onChange={handleChange}
            required
          />
        </div>
        <text
          className={
            errorSala
              ? "message-error-sala"
              : successSala
              ? "message-success-sala"
              : ""
          }
        >
          {"" || errorSala || successSala}
        </text>
        <div className="grid">
          <button
            disabled={!!errorSala}
            className="grava-sala"
            type="button"
            onClick={() => validaCadastroSala("sala")}
          >
            Gravar Sala
          </button>
          <button
            disabled={!!errorSala}
            className="materiais-sala"
            type="button"
            onClick={() => validaCadastroSala("material")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Cadastro Materiais
          </button>
          {showTooltip && (
            <span className="tooltiptext">
              Será gravada a sala e depois será possível realizar vínculo do
              material!
            </span>
          )}
        </div>
      </form>
      </Layout>
      <ModalComponent
        isOpen={isModalOpen && !error}
        onClose={handleCloseModal}
        titleM="Materiais"
      >
        <form className="ajustes-sala">
          <div>
            <label className={errorMaterial && !idSalaStored ? "modal-titulo-sala-error" : "modal-titulo-sala"}>Sala</label>
            <input
              className="modal-input-sala"
              value={nm_SalaStored}
              style={{
                backgroundColor: "#000b1a",
                color: "#fff",
                cursor: "not-allowed",
              }}
              type="text"
              name="Sala"
              readOnly
            />
          </div>
          <div>
            <label className={errorMaterial && !selectMaterial ? "modal-titulo-sala-error" : "modal-titulo-sala"}>Material/Estoque</label>
            <select
              className="modal-input-sala"
              name="id_material"
              id=""
              value={selectMaterial}
              onChange={handleSetMaterial}
              required
            >
              <option value="">Selecione um material</option>
              {materiais.map((material) => (
                <option key={material.id_material} value={material.id_material}>
                  {material.ds_material} - {material.qt_material} un.
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={errorMaterial && !qt_materialSala ? "modal-titulo-sala-error" : "modal-titulo-sala"}>Quantidade</label>
            <input
              className="modal-input-sala"
              type="number"
              name="qt_materialSala"
              value={qt_materialSala}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className= "modal-titulo-sala">Descrição Material/Sala</label>
            <input
              className="modal-input-sala"
              type="text"
              name="ds_materialSala"
              value={ds_materialSala}
              onChange={handleChange}
            />
          </div>
          <div className="modal-input-sala-error">
            <text
            className={
              errorMaterial
                ? "message-error-material"
                : successMaterial
                ? "message-success-material"
                : ""
            }
          >
            {"" || errorMaterial || successMaterial}
          </text>
        </div>
          <button 
            disabled={!!errorMaterial}
            className="grava-materiais"
            type="button"
            onClick={validaCadastroMaterial}>
            Adicionar Material
          </button>
        </form>
        {showConfirmAlert &&(
                <div className="close-alert-overlay">
                    <div className="close-alert">
                        <div className="close-alert-body">
                            <h1>ATENÇÃO!</h1>
                            <p>Deseja encerrar o cadastro de materiais para a sala {nm_SalaStored} ?</p>
                            <div className="close-alert-button-group">
                                <button onClick={() => handleConfirmClose(true)}>Sim</button>
                                <button onClick={() => handleConfirmClose(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
      </ModalComponent>
    </div>
  );
};

export default CadSala;
