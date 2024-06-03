import { useCallback, useEffect, useState } from "react";
import ModalComponent from "../components/ModalComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const CadMaterialSala = ({ onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [materiais, setMateriais] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState("");
  const [salas, setSalas] = useState([]);
  const [selectSala, setSelectSala] = useState("");
  const [qt_materialSala, setQt_materialSala] = useState("");
  const [ds_materialSala, setDs_materialSala] = useState("");

  const [errorMaterial, setErrorMaterial] = useState("");
  const [successMaterial, setSuccessMaterial] = useState("");

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const buscarSalas = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-sala", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.salas;
      console.log(data);
      if (Array.isArray(data)) {
        setSalas(data);
      } else {
        console.error("Formato inexperado do respose de sala", data);
        setSalas([]);
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
      buscarSalas();
      buscarMateriais();
    }
  }, [isAuthenticated, navigate, buscarMateriais, buscarSalas]);

  const handleCloseModal = () => {
    if (
        selectSala ||
        selectMaterial ||
        qt_materialSala ||
        ds_materialSala
      ) {
          setShowConfirmAlert(true)
      }else{
        onClose();
      }
  };

  const handleSetMaterial = (event) => {
    console.log(selectSala);
    setSelectMaterial(event.target.value);
    setErrorMaterial("");
  };

  const handleSetSala = (event) => {
    setSelectSala(event.target.value);
    setErrorMaterial("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMaterial("");
    switch (name) {
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
        setDs_materialSala(value);
        console.log(selectMaterial);
        break;
      default:
        break;
    }
  };

  const handleConfirmClose = (confirm) => {
    if (confirm) {
      onClose();
    } else {
      setShowConfirmAlert(false)
    }
  }

  const validaCadastroMaterial = () => {
    let materialErro = false;

    if (
      !selectSala ||
      !selectMaterial ||
      !qt_materialSala ||
      qt_materialSala === ""
    ) {
      setErrorMaterial("Campos obrigatórios devem ser preenchidos!");
      materialErro = true;
    } else {
      setErrorMaterial("");
      materialErro = false;
    }

    if (!materialErro) {
      handleCadastroMaterialSala();
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
          id_sala: Number(selectSala),
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
        setSelectSala("");
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

  return (
    <ModalComponent
      isOpen={true}
      onClose={handleCloseModal}
      titleM={"Vincular Material"}
    >
      <form className="ajustes-sala">
        <div>
          <label
            className={
              errorMaterial && !selectSala
                ? "modal-titulo-sala-error"
                : "modal-titulo-sala"
            }
          >
            Sala
          </label>
          <select
            className="modal-input-sala"
            name="id_sala"
            id=""
            value={selectSala}
            onChange={handleSetSala}
            required
          >
            <option value="">Sala - Bloco - Polo</option>
            {salas.map((sala) => (
              <option key={sala.id_sala} value={sala.id_sala}>
                {sala.nm_sala} - {sala.bloco.nm_bloco} -{" "}
                {sala.bloco.polo.nm_polo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className={
              errorMaterial && !selectMaterial
                ? "modal-titulo-sala-error"
                : "modal-titulo-sala"
            }
          >
            Material/Estoque
          </label>
          <select
            className="modal-input-sala"
            name="id_material"
            id=""
            value={selectMaterial}
            onChange={handleSetMaterial}
            required
          >
            <option value="">Material - Quantidade</option>
            {materiais.map((material) => (
              <option key={material.id_material} value={material.id_material}>
                {material.ds_material} - {material.qt_material} un.
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className={
              errorMaterial && !qt_materialSala
                ? "modal-titulo-sala-error"
                : "modal-titulo-sala"
            }
          >
            Quantidade
          </label>
          <input
            className="modal-input-sala"
            type="number"
            name="qt_materialSala"
            value={qt_materialSala}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="modal-titulo-sala">Descrição Material/Sala</label>
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
          onClick={validaCadastroMaterial}
        >
          Adicionar Material
        </button>
      </form>
      {showConfirmAlert &&(
                <div className="close-alert-overlay">
                    <div className="close-alert">
                        <div className="close-alert-body">
                            <h1>ATENÇÃO!</h1>
                            <p>Possuem campos preenchidos!<br></br>Deseja voltar?</p>
                            <div className="close-alert-button-group">
                                <button onClick={() => handleConfirmClose(true)}>Sim</button>
                                <button onClick={() => handleConfirmClose(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </ModalComponent>
  );
};

export default CadMaterialSala;
