import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import LayoutConsulta from "../components/LayoutConsulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../consCss/ConsSala.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ModalComponent from "../components/ModalComponent";

const ConsSala = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem("token");
    const [salas, setSalas] = useState([]);
    const [materiaisSala, setMateriaisSala] = useState([]);
    const [materiaisSalaDelete, setMateriaisSalaDelete] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tituloModal, setTituloModal] = useState("");
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);

    const [error, setError] = useState("");
    const [messageSuccess, setMessageSuccess] = useState("");

    const consultaSalas = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/sala", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.salas;
            if (Array.isArray(data)) {
                setSalas(data);
            } else {
                console.error("Formato inexperado do respose de sala", data);
                setSalas([]);
            }
        } catch (error) {
          console.log(error.response.data);
          setError(error.response.data.error);
        }
    }, [token]);

    const consultaMaterialPorSala = useCallback(async (idSala) => {
        setError("");
        try {
            const response = await axios.get(`http://localhost:8080/materialsala/sala/${idSala}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.materialSala;
            if (Array.isArray(data)) {
                setMateriaisSala(data);
            } else {
                console.error("Formato inexperado do respose de materialSala", data);
                setMateriaisSala([]);
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
            consultaSalas();
        }
      }, [isAuthenticated, navigate, consultaSalas]);

    const handleConfirmDelete = (confirm) => {
    if (confirm) {
        deletarVinculoMatSala(materiaisSalaDelete.id_materialSala);
    } else {
        setShowConfirmAlert(false)
        setMateriaisSalaDelete([])
    }
    }

    const handleOpenMateriais = async (sala) =>{
        setMateriaisSala([]);
        await consultaMaterialPorSala(sala.id_sala);
        setIsModalOpen(true);
        setTituloModal("Materiais - Sala "+sala.nm_sala+" - Bloco "+sala.bloco.nm_bloco+" - Polo "+sala.bloco.polo.nm_polo);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTituloModal("");
        setError("");
    };

    const handleDeleteVinc = (materialSalaDel) =>{
        setShowConfirmAlert(true);
        setMateriaisSalaDelete(materialSalaDel)
    }

    const deletarVinculoMatSala = async (id) =>{
        try{
            const response = await axios.delete(`http://localhost:8080/materialSala/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            consultaSalas();
            setIsModalOpen(false);
            setShowConfirmAlert(false);
            setMateriaisSalaDelete([])
            console.log(response.data)
            setMessageSuccess(response.data.message);
            setTimeout(() => {
                setMessageSuccess("");
              }, 2000);
        }catch(error){
            console.log(error.response.data);
            // setShowConfirmAlert(false);
            // setMessageDelete(error.response.data.error);
            // setTimeout(() => {
            //     setMessageDelete("");
            //     setEditRowId(null);
            //   }, 5000);
        }
    }

    return (
    <div>
        <LayoutConsulta titleCons='Consulta Salas'>
            {salas.map((sala) => (
                <div className="informacoes-sala" key={sala.id_sala }>
                    <FontAwesomeIcon icon={faDoorOpen} size="3x" style={{color: "#001636"}}/>
                    <div className="consulta-sala">
                        <h4>Bloco - Polo:</h4>
                        <p>{sala.bloco.nm_bloco} - {sala.bloco.polo.nm_polo}</p>
                    </div>
                    <div className="consulta-sala">
                        <h4>Sala:</h4>
                        <p>{sala.nm_sala}</p>
                    </div>
                    <div className="consulta-sala">
                        <h4>Capacidade Vigilância:</h4>
                        <p>{sala.qt_capacvigilancia} Pessoas</p>
                    </div>
                    <div className="consulta-sala">
                        <button className="button-materiais" onClick={()=>handleOpenMateriais(sala)}>Materiais</button>
                    </div>
                </div>
            ))}
        </LayoutConsulta>
        <ModalComponent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            titleM={tituloModal}
        >
            {error ? 
            <text className="message-error-cons-sala">{error}</text>
            :( 
            <div className="body-modal-all">
                {materiaisSala.map((materialSala) => ( 
                <div key={materialSala.id_materialSala}>
                    <div className="modal-body-consSala">
                        <div className="item-row-consSala ajuste-textos">
                            <h4>Material:</h4>
                            <p>{materialSala.material.ds_material}</p>
                        </div>
                        <div className="item-row-consSala">
                            <h4>Quantidade na Sala:</h4>
                            <p>{materialSala.qt_materialSala}</p>
                        </div>
                        <div className="item-row-consSala">
                            <h4>Em Estoque:</h4>
                            <p>{materialSala.material.qt_material}</p>
                        </div>
                        <button className="button-rem-vinc" onClick={()=>handleDeleteVinc(materialSala)}>Remover<br></br>Vinculo</button>
                    </div>
                </div>
                ))}
            </div>)}
            {showConfirmAlert &&(
            <div className="delete-overlay">
                <div className="delete-vinc">
                    <div className="delete-vinc-body">
                        <h1>ATENÇÃO!</h1>
                        <p>Certeza que deseja deletar o vinculo do material "{materiaisSalaDelete.material.ds_material}" com a sala "{materiaisSalaDelete.sala.nm_sala}"?</p>
                        <div className="delete-vinc-button-group">
                            <button onClick={() => handleConfirmDelete(true)}>Sim</button>
                            <button onClick={() => handleConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </ModalComponent>
        {messageSuccess &&(
            <div className="success-overlay">
                <div className="success">
                    <div className="success-body">
                        <h3>{messageSuccess}</h3>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}

export default ConsSala;