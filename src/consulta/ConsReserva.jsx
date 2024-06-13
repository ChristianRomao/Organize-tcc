import axios from "axios";
import Layout from "../components/Layout";
import "../consCss/ConsReserva.css";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { faCheck, faX, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsReserva = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [reservas, setReservas] = useState([]);

    const [ds_placeholder, setDs_placeholder] = useState("");

    const [tp_filtro, setTp_filtro] = useState("");
    const [dt_filtro, setDt_filtro] = useState("");
    const [ds_filtro, setDs_filtro] = useState("");
    const [idDelete, setIdDelete]   = useState(null);

    const [listStatus, setListStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState("");

    const [editRowId, setEditRowId] = useState(null);

    const [selectStatusChange, setSelectStatusChange] = useState("");
    const [dsObservacaoChange, setDsObservacaoChange] = useState("");

    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [messageDelete, setMessageDelete] = useState("");

const consultaReserva = useCallback(async () =>{
    try{
        const response = await axios.get("http://localhost:8080/reserva", {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.reservas;
        setReservas(data);
        }catch(error){
            console.error(error)
        }
    }, [token]);

    const consultaStatus = useCallback(async () =>{
        try{
            const response = await axios.get("http://localhost:8080/consulta-status", {
                headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data)
            const data = response.data.status;
            setListStatus(data);
            }catch(error){
                console.error(error)
            }
        }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
        navigate("/login");
        } else {
        consultaReserva();
        consultaStatus();
        }
    }, [isAuthenticated, navigate, consultaReserva,consultaStatus]);

    const handleSetTipoFiltro = (event) =>{
        const placeholderFixo = "Digite "
        setDt_filtro("");
        setDs_filtro("");
        setSelectStatus("");
        const value = event.target.value 
        setTp_filtro(value)
        
        switch(value){
            case "tp_idReserva":
                setDs_placeholder(placeholderFixo+"o número da reserva");
                break;
            case "tp_nmSala":
                setDs_placeholder(placeholderFixo+"o nome da sala reservada");
                break;
            case "tp_nmUsuario":
                setDs_placeholder(placeholderFixo+"o nome do usuário responsável");
                break;
            case "tp_dsCurso":
                setDs_placeholder(placeholderFixo+"o nome do curso");
                break;
            case "tp_dtReserva":
                setDs_placeholder("Selecione/digite a data");
                break;
            default:
                break;
        }

    }

    const handleConfirmDelete = (confirm) => {
        if (confirm) {
          deletarReserva(idDelete);
        } else {
          setShowConfirmAlert(false)
          setIdDelete(null)
        }
    }

    const handleDelete = (reserva) => {
        if (reserva.status.cd_status === 'C'){
            setShowConfirmAlert(true)
            setIdDelete(reserva.id_reserva)
        }else{
            setMessageDelete("Somente reservas com o status CANCELADO é permitida a exclusão!");
            setTimeout(() => {
                setMessageDelete("");
                setShowConfirmAlert(false)
                setIdDelete(null);
              }, 5000);
              
        }
      };

    const handleSetStatus = (event) =>{
        setSelectStatus(event.target.value)
    }

    const handleSetStatusChange = (event) =>{
        setSelectStatusChange(event.target.value);
    }

    const handleClearFiltro = () => {
        setTp_filtro("");
        setDt_filtro("");
        setDs_filtro("");
        setSelectStatus("");
        setDs_placeholder("");
    }

    const handleChangeEdit = (reserva) =>{

        const dsObsReserva = reserva.ds_observacao; 
        const stReserva = reserva.status.cd_status;


        if(dsObservacaoChange !== "") {
            setDsObservacaoChange("");
        }

        if(dsObsReserva !== ""){
            setDsObservacaoChange(dsObsReserva);
        }

        if(stReserva !== ''){
            setSelectStatusChange(stReserva)
        }

        setEditRowId(reserva.id_reserva);

    }

    const handleCancelEdit = () => {
        setEditRowId(null);
        setDsObservacaoChange("")
        // setEditedValues({});
    };

    const handleChange = (event) =>{
        const {name,value} = event.target
        switch(name){
            case "dt_filtro":
                setDt_filtro(value);
                break;
            case "ds_filtro":
                setDs_filtro(value);
                break;
            case "ds_observacaoChange":
                setDsObservacaoChange(value);
                break;
            default:
                break;
        }
    }

    const searchComFiltro = () =>{
        consultaReserva();
    }

    const alterarReserva = async (id) =>{
        if(!id){
            setMessageDelete("Necessário selecionar uma reserva!");
            setTimeout(() => {
                setMessageDelete("");
              }, 5000);
        }

        const payload = {
            ds_observacao: dsObservacaoChange,
            status:{
                cd_status: selectStatusChange
            }
          };
      
          try {
            const response = await axios.put(`http://localhost:8080/reserva/${id}`, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            consultaReserva();
            setMessageDelete(response.data.message);
            setEditRowId(null);
            setTimeout(() => {
                setMessageDelete("");
              }, 2000);
          } catch (error) {
            console.log(error.response.data);
            setMessageDelete(error.response.data.error);
            setTimeout(() => {
                setMessageDelete("");
                setEditRowId(null);
              }, 5000);
          }
    }

    const deletarReserva = async (id) =>{
        try{
            const response = await axios.delete(`http://localhost:8080/reserva/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            consultaReserva();
            setShowConfirmAlert(false);
            setMessageDelete(response.data.message);
            setTimeout(() => {
                setMessageDelete("");
              }, 2000);
        }catch(error){
            console.log(error.response.data);
            setShowConfirmAlert(false);
            setMessageDelete(error.response.data.error);
            setTimeout(() => {
                setMessageDelete("");
                setEditRowId(null);
              }, 5000);
        }
    }

    return (
       <Layout title='Consulta da Reserva' next="" noicon>
        <div className="ajustes-consulta-reserva">
            <div className="conteudo-consulta-reserva">
                <div className="grid-cons-reserva">
                    <select 
                        className="select-consulta-reserva" 
                        name="Tipo Filtro" 
                        value={tp_filtro}
                        onChange={handleSetTipoFiltro}
                        id="tp_filtro"
                    >
                        <option value="Tipos" selected hidden>Selecione o tipo</option>
                        <option value="tp_idReserva" >Nr Reserva</option>
                        <option value="tp_nmSala" >Sala</option>
                        <option value="tp_nmUsuario" >Usuário</option>
                        <option value="tp_dsCurso" >Curso</option>
                        <option value="tp_dtReserva" >Data</option>
                        <option value="tp_stReserva" >Status</option>
                    </select>
                    <input 
                        disabled={!tp_filtro || tp_filtro !== "tp_dtReserva"}
                        className="inputs-data-reserva"
                        type="date"     
                        name="dt_filtro"     
                        id=""
                        value={dt_filtro}
                        onChange={handleChange}
                    />
                    {tp_filtro === "tp_stReserva"?
                    <select 
                        className="select-consulta-reserva" 
                        name="cd_status" 
                        value={selectStatus}
                        onChange={handleSetStatus}
                        id="cd_status"
                    >
                        <option value="Tipos" selected hidden>Selecione o Status</option>
                        {listStatus.map((status) => (
                            <option key={status.cd_status} value={status.cd_status}>
                                {status.ds_status}
                            </option>
                        ))}
                    </select>
                    :
                    <input 
                        disabled={!tp_filtro || tp_filtro === "tp_dtReserva"}
                        className="inputs-consulta-reserva"
                        type="search" 
                        name="ds_filtro" 
                        placeholder={ds_placeholder?`${ds_placeholder}`:"Selecione o tipo de filtro"}
                        value={ds_filtro}
                        onChange={handleChange}
                        id="" 
                    />}
                    <button 
                        disabled={tp_filtro && (!dt_filtro && !ds_filtro && !selectStatus)} 
                        className={`botao-consulta-reserva ${tp_filtro && (!dt_filtro && !ds_filtro && !selectStatus)? 'disabled-hover' : ''}`} 
                        type="button"
                        onClick={searchComFiltro}
                    >
                        Pesquisar
                    </button>
                    <button className="botao-limpa-filtro" type="button" onClick={handleClearFiltro}><FontAwesomeIcon icon={faX}/></button>
                </div>
                <div className="tabela">
                    <table>
                        <thead className="cabecalho">
                            <tr>
                                <th className="colunas-cabecalho">Nr Reserva</th>
                                <th className="colunas-cabecalho">Sala</th>
                                <th className="colunas-cabecalho">Usuário</th>
                                <th className="colunas-cabecalho">Turma - Curso</th>
                                <th className="colunas-cabecalho">Início</th>
                                <th className="colunas-cabecalho">Fim</th>
                                <th className="colunas-cabecalho">Hr Inicio - Hr Fim</th>
                                <th className="colunas-cabecalho">Status</th>
                                <th className="colunas-cabecalho">Observação</th>
                            </tr>
                        </thead>
                        <tbody className="contudo-tabela">
                            {reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>{reserva.id_reserva}</td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}><button className={editRowId === reserva.id_reserva?"button-coluna-body-selection":"button-coluna-body"}>{reserva.sala.nm_sala}</button></td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}><button className={editRowId === reserva.id_reserva?"button-coluna-body-selection":"button-coluna-body"}>{reserva.usuario.nm_usuario}</button></td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}><button className={editRowId === reserva.id_reserva?"button-coluna-body-selection":"button-coluna-body"}>{reserva.grade.turma.ds_turma} - {reserva.grade.turma.curso.ds_curso}</button></td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>{new Date(reserva.dt_inicio).toLocaleDateString('pt-BR', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>{new Date(reserva.dt_fim).toLocaleDateString('default', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>
                                    
                                    {new Date(reserva.dt_inicio).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}    - {new Date(reserva.dt_fim).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}
                                </td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>
                                    {editRowId === reserva.id_reserva? (
                                        <select 
                                            className="colunas-body-selection"
                                            name="cd_status" 
                                            value={selectStatusChange}
                                            onChange={handleSetStatusChange}
                                            id="cd_status"
                                            >
                                            <option value="" selected hidden>Status</option>
                                            {listStatus.map((status) => (
                                                <option key={status.cd_status} value={status.cd_status}>
                                                    {status.ds_status}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        reserva.status.ds_status
                                    )}
                                </td>
                                <td className={editRowId === reserva.id_reserva?"colunas-body-selection":"colunas-body"}>
                                    {editRowId === reserva.id_reserva? (
                                        <input 
                                            className="input-selection"
                                            type="text" 
                                            name="ds_observacaoChange" 
                                            placeholder=""
                                            value={dsObservacaoChange}
                                            onChange={handleChange}
                                            id="" 
                                        />
                                    ):(
                                        reserva.ds_observacao
                                    )}
                                </td>
                                <td className="colunas-body-button">
                                    {editRowId === reserva.id_reserva? (
                                                <div className="buttons-actions">
                                                    {/* <button className="btn-salvar" onClick={() => handleSaveEdit(reserva.id_reserva)}>Salvar</button> */}
                                                    <button className="btn-cancelar-edicao" onClick={handleCancelEdit}><FontAwesomeIcon icon={faX}/></button>
                                                    <button className="btn-salvar" onClick={()=>alterarReserva(Number(reserva.id_reserva))}><FontAwesomeIcon icon={faCheck}/></button>
                                                </div>
                                            ) : (
                                                <div className="buttons-actions">
                                                    <button className="btn-editar" onClick={() => handleChangeEdit(reserva)}><FontAwesomeIcon icon={faPen}/></button>
                                                    <button className="btn-remover" onClick={() => handleDelete(reserva)}><FontAwesomeIcon icon={faTrash}/></button>
                                                </div>

                                            )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>           
        </div>
        {showConfirmAlert &&(
            <div className="delete-overlay">
                <div className="delete">
                    <div className="delete-body">
                        <h1>ATENÇÃO!</h1>
                        <p>Certeza que deseja deletar a reserva número {idDelete}?</p>
                        <div className="delete-button-group">
                            <button onClick={() => handleConfirmDelete(true)}>Sim</button>
                            <button onClick={() => handleConfirmDelete(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
                {messageDelete &&(
                    <div className="delete-overlay">

                    <div className="delete">
                    <div className="delete-body">
                        <h3>{messageDelete}</h3>
                    </div>
                    </div>
                </div>
        )}
       </Layout>
    );
}

export default ConsReserva;