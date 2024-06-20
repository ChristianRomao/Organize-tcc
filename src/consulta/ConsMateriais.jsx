import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutConsulta from "../components/LayoutConsulta";
import '../consCss/ConsMateriais.css';
import { faCheck, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const ConsMateriais = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [materiais, setMateriais] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const [rowIdAddRem, setRowIdAddRem] = useState(null);
    const [nm_Material, setNm_Material] = useState("");
    const [qt_currentMaterial, setQt_currentMaterial] = useState(null);
    const [qtMaterialAddRem, setQtMaterialAddRem] = useState(null);

    const [messageSuccess, setMessageSuccess] = useState("");
    const [messageError, setMessageError] = useState("");

    const consultaMateriais = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/material", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.materiais;
            if (Array.isArray(data)) {
                setMateriais(data);
                setMessageError("");
            } else {
                console.error("Formato inexperado do respose de materiais", data);
                setMateriais([]);
                setMessageError("Formato inexperado do respose de materiais", data);
                setTimeout(() => {
                    setMessageError("");
                  }, 5000);
            }
        } catch (error) {
          console.log(error.response.data);
          setMessageError(error.response.data.error);
          setTimeout(() => {
              setMessageError("");
            }, 5000);
        }
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            consultaMateriais();
        }
      }, [isAuthenticated, navigate, consultaMateriais]);

    const handleMovtoMaterial = (material) =>{
        setRowIdAddRem(material.id_material);
        setQtMaterialAddRem(null);
        setNm_Material(material.ds_material);
        setQt_currentMaterial(material.qt_material);
    }

    const handleChange = (event) =>{
        setQtMaterialAddRem(event.target.value)
    }

    const cancelAddRem = () =>{
        setRowIdAddRem(null)
        setQtMaterialAddRem(null)
    }

    const handleConfirmAddRem = () =>{
        console.log(qtMaterialAddRem)
        setShowAlert(true);
    }

    const handleConfirmAlert = (confirm) => {
        if (confirm) {
            alterarMaterial(Number(rowIdAddRem))
        } else {
            setShowAlert(false);
        }
      }

      const alterarMaterial = async (id) =>{
        const payload = {
            qt_material: Number(qtMaterialAddRem)
          };
      
          try {
            const response = await axios.put(`http://localhost:8080/material/${id}`, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setShowAlert(false);
            consultaMateriais();
            setMessageError("");
            setRowIdAddRem(null);
            setMessageSuccess(response.data.message);
            setTimeout(() => {
                setMessageSuccess("");
              }, 2000);
          } catch (error) {
            console.log(error.response.data);
            setMessageError(error.response.data.error);
            setTimeout(() => {
                setMessageError("");
              }, 5000);
            setRowIdAddRem(null);
          }
    }

    return (
        <LayoutConsulta titleCons='Consulta Materiais'>
            {materiais.map((material) => (
                <div className={rowIdAddRem === material.id_material ? "informacoes-materiais-selected" : "informacoes-materiais"} key={material.id_material}>
                    <FontAwesomeIcon icon={faPencil} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-materiais">
                        <h4>Nome Material:</h4>
                        <p className="ajuste-textos" data-tooltip={material.ds_material}>{material.ds_material}</p>
                    </div>
                    <div className="consulta-materiais">
                        <h4>Quantidade:</h4>
                        <p>{material.qt_material} {material.qt_material === 1 ? "Material" : "Materiais"}</p>
                    </div>
                    <div className="consulta-materiais">
                            {rowIdAddRem !== material.id_material ? (<button className="button-add-rem" onClick={()=>handleMovtoMaterial(material)}>Adicionar/Remover</button>) : 
                        (<div className="mov-materiais">
                            <input type="number" name="qt_materialaddrem" value={qtMaterialAddRem} onChange={handleChange} className="input-mov-materiais"></input>
                            <button className="button-cancel-addrem" onClick={cancelAddRem}><FontAwesomeIcon icon={faX} size="2x" style={{color:"#09264e"}}/></button>
                            <button disabled={!qtMaterialAddRem} className="button-save-addrem" onClick={handleConfirmAddRem}><FontAwesomeIcon icon={faCheck} size="2x" style={{color:"#09264e"}}/></button>
                        </div>)
                            }
                    </div>
                </div>
            ))}
            {showAlert && qtMaterialAddRem && (
                <div className="gravar-alert-overlay">
                    <div className={Number(qtMaterialAddRem) >= 0 ? "gravar-alert-materiais":"gravar-alert-materiais-neg"}>
                        <div className="gravar-alert-materiais-body">
                            <h1>ATENÇÃO!</h1>
                            <p>Deseja {Number(qtMaterialAddRem) >= 0 ? "adicionar" : "remover"} {Number(qtMaterialAddRem) > 0 ? Number(qtMaterialAddRem) : (Number(qtMaterialAddRem)*-1)} {Number(qtMaterialAddRem) === 1 ? "item" : "itens"} do material "{nm_Material}"?</p>
                            <div className="gravar-alert-materiais-button-group">
                                <button onClick={() => handleConfirmAlert(true)}>Sim</button>
                                <button onClick={() => handleConfirmAlert(false)}>Não</button>
                            </div>
                            <h3>O estoque ficará com {Number(qt_currentMaterial)+Number(qtMaterialAddRem)} {Number(qt_currentMaterial)+Number(qtMaterialAddRem) === 1 ? "material" : "materiais"}</h3>
                        </div>
                    </div>
                </div>
            )}
            {messageSuccess &&(
                    <div className="success-overlay">

                    <div className="success">
                    <div className="success-body">
                        <h3>{messageSuccess}</h3>
                    </div>
                    </div>
                </div>
            )}
            {messageError && (
                <div className="gravar-alert-overlay">
                    <div className="gravar-alert-materiais-neg">
                        <div className="gravar-alert-materiais-body">
                            <h3>{messageError}</h3>
                        </div>
                    </div>
                </div>
            )}
        </LayoutConsulta>
    );
}

export default ConsMateriais;