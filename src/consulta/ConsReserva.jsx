import axios from "axios";
import Layout from "../components/Layout";
import "../consCss/ConsReserva.css";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { faCheck, faX, faPen, faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../components/ModalComponent";
import { jwtDecode } from "jwt-decode";


const ConsReserva = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isAdmin, setIsAdmin] = useState(false);


    const [reservas, setReservas] = useState([]);

    const [ds_placeholder, setDs_placeholder] = useState("");

    const [tp_filtro, setTp_filtro] = useState("");
    const [dt_filtro, setDt_filtro] = useState("");
    const [ds_filtro, setDs_filtro] = useState("");
    const [idDelete, setIdDelete]   = useState(null);

    const [listStatus, setListStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState("");

    const [editRowId, setEditRowId] = useState(null);
    const [nm_reservaDel, setNm_reservaDel] = useState("");

    const [selectStatusChange, setSelectStatusChange] = useState("");
    const [dsObservacaoChange, setDsObservacaoChange] = useState("");

    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [messageDelete, setMessageDelete] = useState("");
    
    const [alerta, setAlerta] = useState("");
    const [messageSuccess, setMessageSuccess] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idInfos, setIdInfos] = useState("");

const consultaReserva = useCallback(async () =>{
    try{
        const response = await axios.get("http://localhost:8080/reservas/grupos", {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.reservas;
        setReservas(data);
        setDs_filtro("");
        setDt_filtro("");
        setSelectStatus("");
        }catch(error){
            console.error(error)
            setMessageDelete(error.response.data.error);
            setTimeout(() => {
                setMessageDelete("");
                setEditRowId(null);
              }, 5000);
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
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                  }, 5000);            }
        }, [token]);

    useEffect(() => {
        if (!isAuthenticated()) {
        navigate("/login");
        } else {
            const decode = jwtDecode(token);

            if(decode.ds_funcao === 'admin'){
              setIsAdmin(true);
            }else{
              setIsAdmin(false);
            }
            consultaReserva();
            consultaStatus();
        }
    }, [isAuthenticated, navigate, consultaReserva,consultaStatus, token]);

    const handleSetTipoFiltro = (event) =>{
        const placeholderFixo = "Digite "
        setDt_filtro("");
        setDs_filtro("");
        setSelectStatus("");
        const value = event.target.value 
        setTp_filtro(value)
        
        switch(value){
            case "tp_nmReserva":
                setDs_placeholder(placeholderFixo+"o nome da reserva");
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
            setShowConfirmAlert(true);
            setIdDelete(reserva.id_grupo);
            setNm_reservaDel(reserva.nm_reserva);
        }else{
            setMessageDelete("Somente reservas com o status CANCELADO é permitida a exclusão!");
            setTimeout(() => {
                setMessageDelete("");
                setShowConfirmAlert(false);
                setIdDelete(null);
                setNm_reservaDel("");
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
        consultaReserva();
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

        setEditRowId(reserva.id_grupo);

    }

    const handleCancelEdit = () => {
        setEditRowId(null);
        setDsObservacaoChange("")
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

    const searchComFiltro = (tp_filtro, ds_filtro, dt_filtro) =>{
        if(tp_filtro === "tp_nmReserva"){
            consultaReservaNome(ds_filtro)
        }else if(tp_filtro === "tp_nmSala"){
            consultaReservaSala(ds_filtro)
        }else if(tp_filtro === "tp_nmUsuario"){
            consultaReservaUsuario(ds_filtro)
        }else if(tp_filtro === "tp_dsCurso"){
            consultaReservaCurso(ds_filtro)
        }else if(tp_filtro === "tp_stReserva"){
            consultaReservaStatus(selectStatus)
        }else{
            consultaReserva();
        }
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
            setMessageSuccess(response.data.message);
            setEditRowId(null);
            setTimeout(() => {
                setMessageSuccess("");
              }, 2000);
          } catch (error) {
            console.log(error.response.data);
            setEditRowId(null);
            setAlerta(error.response.data.alert);
            setTimeout(() => {
                setAlerta("");
              }, 5000);
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
            setNm_reservaDel("");
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

    const consultaReservaNome = useCallback(async (nome) =>{
        try{
            const response = await axios.get(`http://localhost:8080/reserva/nome/${nome}`, {
                headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = response.data.reservas;
            setReservas(data);
            setDs_filtro("");
            setDt_filtro("");
            }catch(error){
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                  }, 5000);            }
        }, [token]);

    const consultaReservaSala = useCallback(async (nome) =>{
        try{
            const response = await axios.get(`http://localhost:8080/reserva/sala/${nome}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.reservas;
            setReservas(data);
            setDs_filtro("");
            setDt_filtro("");
            }catch(error){
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                  }, 5000);            }
        }, [token]);

    const consultaReservaUsuario = useCallback(async (nome) =>{
        try{
            const response = await axios.get(`http://localhost:8080/reserva/usuario/${nome}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.reservas;
            setReservas(data);
            setDs_filtro("");
            setDt_filtro("");
            }catch(error){
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                  }, 5000);            }
        }, [token]);

    const consultaReservaCurso = useCallback(async (nome) =>{
        try{
            const response = await axios.get(`http://localhost:8080/reserva/curso/${nome}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.reservas;
            setReservas(data);
            setDs_filtro("");
            setDt_filtro("");
            }catch(error){
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                  }, 5000);            }
        }, [token]);

    const consultaReservaStatus = useCallback(async (nome) =>{
        try{
            const response = await axios.get(`http://localhost:8080/reserva/status/${nome}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.reservas;
            setReservas(data);
            setDs_filtro("");
            setDt_filtro("");
            }catch(error){
                setMessageDelete(error.response.data.error);
                setTimeout(() => {
                    setMessageDelete("");
                    setEditRowId(null);
                }, 5000);}
        }, [token]);

    const handleOpenInfos = async (id) =>{
        setIsModalOpen(true);
        setIdInfos(id);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIdInfos("");
    };

    return (
        <div>
        <Layout title='Consulta da Reserva' next="" noicon>
            <div className="ajustes-consulta-reserva">
                <div className="grid-cons-reserva">
                    <select 
                        className="select-consulta-reserva" 
                        name="Tipo Filtro" 
                        value={tp_filtro}
                        onChange={handleSetTipoFiltro}
                        id="tp_filtro"
                    >
                        <option value="Tipos" selected hidden>Selecione o tipo</option>
                        <option value="tp_nmReserva" >Nome</option>
                        <option value="tp_nmSala" >Sala</option>
                        <option value="tp_nmUsuario" >Usuário</option>
                        <option value="tp_dsCurso" >Curso</option>
                        {/* <option value="tp_dtReserva" >Data</option> */}
                        <option value="tp_stReserva" >Status</option>
                    </select>
                    {/* <input 
                        disabled={!tp_filtro || tp_filtro !== "tp_dtReserva"}
                        className="inputs-data-reserva"
                        type="date"     
                        name="dt_filtro"     
                        id=""
                        value={dt_filtro}
                        onChange={handleChange}
                    /> */}
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
                        onClick={()=>searchComFiltro(tp_filtro,ds_filtro,dt_filtro)}
                    >
                        Pesquisar
                    </button>
                    <button className="botao-limpa-filtro" type="button" onClick={handleClearFiltro}><FontAwesomeIcon icon={faX}/></button>
                </div>
                <div className="conteudo-consulta-reserva">
                    <div className="tabela">
                        <table>
                            <thead>
                                <tr>
                                    <th id="info-cabecalho"></th>
                                    <th className="colunas-cabecalho">Nome</th>
                                    <th className="colunas-cabecalho">Sala</th>
                                    <th className="colunas-cabecalho">Turma - Curso</th>
                                    <th className="colunas-cabecalho">Início</th>
                                    <th className="colunas-cabecalho">Fim</th>
                                    <th className="colunas-cabecalho">Hr Inicio - Hr Fim</th>
                                    <th className="colunas-cabecalho">Usuário</th>
                                    <th className="colunas-cabecalho">Status</th>
                                    <th className="colunas-cabecalho">Observação</th>
                                </tr>
                            </thead>
                            <tbody className="contudo-tabela">
                                {reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                    <td><button className="btn-info" onClick={()=>handleOpenInfos(reserva.id_grupo)}><FontAwesomeIcon icon={faInfo}/></button></td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection ajuste-textos":"colunas-body ajuste-textos"} data-tooltip={reserva.nm_reserva}>{reserva.nm_reserva}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection":"colunas-body"}>{reserva.sala.nm_sala}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection ajuste-textos":"colunas-body ajuste-textos"} data-tooltip={`${reserva.grade.turma.ds_turma} - ${reserva.grade.turma.curso.ds_curso}`}>{reserva.grade.turma.ds_turma} - {reserva.grade.turma.curso.ds_curso}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection":"colunas-body"}>{new Date(reserva.dt_inicio).toLocaleDateString('pt-BR', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection":"colunas-body"}>{new Date(reserva.dt_fim).toLocaleDateString('default', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection":"colunas-body"}> 
                                        {new Date(reserva.dt_inicio).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}    - {new Date(reserva.dt_fim).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}
                                    </td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection ajuste-textos":"colunas-body ajuste-textos"} data-tooltip={reserva.usuario.nm_usuario}>{reserva.usuario.nm_usuario}</td>
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection":"colunas-body-status"}>
                                        {editRowId === reserva.id_grupo? (
                                            <select 
                                                className="dropdown-selection"
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
                                    <td className={editRowId === reserva.id_grupo?"colunas-body-selection ajuste-textos":"colunas-body ajuste-textos"} data-tooltip={reserva.ds_observacao}>
                                        {editRowId === reserva.id_grupo? (
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
                                        {editRowId === reserva.id_grupo? (
                                            <div className="buttons-actions">
                                                <button className="btn-cancelar-edicao" hidden={!isAdmin} onClick={handleCancelEdit}><FontAwesomeIcon icon={faX}/></button>
                                                <button className="btn-salvar" hidden={!isAdmin} onClick={()=>alterarReserva(reserva.id_grupo)}><FontAwesomeIcon icon={faCheck}/></button>
                                            </div>
                                        ) : (
                                            <div className="buttons-actions">
                                                <button className="btn-editar" hidden={!isAdmin} onClick={() => handleChangeEdit(reserva)}><FontAwesomeIcon icon={faPen}/></button>
                                                <button className="btn-remover" hidden={!isAdmin} onClick={() => handleDelete(reserva)}><FontAwesomeIcon icon={faTrash}/></button>
                                            </div>

                                        )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                {alerta ? <text className="message-alert-cons-reserva">{alerta}</text> : <></>}
            </div>
            {showConfirmAlert &&(
                <div className="delete-overlay">
                    <div className="delete">
                        <div className="delete-body">
                            <h1>ATENÇÃO!</h1>
                            <p>Certeza que deseja deletar a reserva {nm_reservaDel}?</p>
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
            {messageSuccess &&(
                <div className="success-overlay">
                    <div className="success">
                        <div className="success-body">
                            <h3>{messageSuccess}</h3>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
        <ModalComponent 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            titleM={'Informações Gerais - Reserva'}
        >
{reservas
  .filter(reserva => reserva.id_grupo === idInfos)
  .map((reserva) => (
    <ul key={reserva.id_reserva} className="infos-reserva">
      <h1 style={{marginLeft:"10px"}}>{reserva.nm_reserva}</h1>
      <li style={{listStyleType:"circle"}}><h4>Data Início: {new Date(reserva.dt_inicio).toLocaleDateString('pt-BR', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</h4></li>
      <li style={{listStyleType:"circle"}}><h4>Data Fim: {new Date(reserva.dt_fim).toLocaleDateString('pt-BR', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</h4></li>
      <li style={{listStyleType:"circle"}}><h4>Hora Início/Fim: {new Date(reserva.dt_inicio).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}    - {new Date(reserva.dt_fim).toLocaleTimeString('default', {timeStyle: 'short', timeZone: 'UTC'})}</h4></li>
      <li style={{listStyleType:"circle"}}><h4>Status: {reserva.status.ds_status}</h4></li>
      <li style={{listStyleType:"circle"}}><h4>Sala: {reserva.sala.nm_sala}</h4>
        <ul>
            <li style={{listStyleType:"square"}}>Bloco: {reserva.sala.bloco.nm_bloco}
            <ul>
                <li style={{listStyleType:"disc"}}>Polo: {reserva.sala.bloco.polo.nm_polo}</li>
                <li style={{listStyleType:"disc"}}>Endereço: {reserva.sala.bloco.polo.ds_endereco}</li>
                <li style={{listStyleType:"disc"}}>Munícipio: {reserva.sala.bloco.polo.municipio.nm_municipio} - {reserva.sala.bloco.polo.municipio.estado.cd_estado}
                <ul>
                <li style={{listStyleType:"square"}}>Instituição: {reserva.sala.bloco.polo.instituicao.nm_fantasia}</li>
                </ul>
                </li>
            </ul>
            </li>
        </ul>
      </li>
      <li style={{listStyleType:"circle", marginTop:"-25px"}}><h4>Turma: {reserva.grade.turma.ds_turma} - {reserva.grade.turma.curso.ds_curso}</h4>
        <ul>
            <li style={{listStyleType:"square"}}>Ano Letivo: {reserva.grade.turma.nr_anoletivo}</li>
            <li style={{listStyleType:"square"}}>Disciplina: {reserva.grade.disciplina.nm_disciplina}</li>
            <li style={{listStyleType:"square"}}>Nr. Carga Horária: {reserva.grade.nr_cargaHr} {reserva.grade.nr_cargaHr === 1 ? "hora" : "horas"}</li>
            <li style={{listStyleType:"square"}}>Qt. Alunos: {reserva.grade.qt_alunos} {reserva.grade.qt_alunos === 1 ? "aluno" : "alunos"}</li>
            <li style={{listStyleType:"square"}}>Professor(a): {reserva.grade.nm_professor}</li>
        </ul>
      </li>
      <li style={{listStyleType:"circle"}}><h4>Usuário: {reserva.usuario.nm_usuario}</h4>
        <ul>
            <li style={{listStyleType:"square"}}>Data Nascimento: {new Date(reserva.usuario.dt_nascimento).toLocaleDateString('pt-BR', { dateStyle: 'short', timeZone: 'UTC'}).replace(",","")}</li>
            <li style={{listStyleType:"square"}}>E-mail: {reserva.usuario.ds_email}</li>
            <li style={{listStyleType:"square"}}>Função: {reserva.usuario.ds_funcao === 'admin' ? "Administrador" : "Usuário"}</li>
        </ul>
      </li>

    </ul>
  ))
}

        </ModalComponent>
        </div>
    );
}

export default ConsReserva;