import axios from "axios";
import Layout from "../components/Layout";
import "../consCss/ConsReserva.css";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const ConsReserva = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [reservas, setReservas] = useState([]);

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

useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      consultaReserva();
    }
  }, [isAuthenticated, navigate, consultaReserva]);


    return (
       <Layout title='Consulta da Reserva' noicon>
        <div className="ajustes-consulta-reserva">
            <div className="conteudo-consulta-reserva">
                <div className="grid-cons-reserva">
                    <select 
                        className="select-consulta-reserva" 
                        name="Tipo Filtro" 
                        id=""
                    >
                        <option value="Tipos" disabled selected hidden>Selecione o tipo</option>
                        <option value="Tipos" >AAA</option>
                    </select>
                    <input 
                        className="inputs-data-reserva"
                        type="date"     
                        name="Data Reserva"     
                        id=""
                    />
                    <input 
                        className="inputs-consulta-reserva"
                        type="search" 
                        name="" 
                        placeholder="Pesquise de acordo com o tipo"
                        id="" 
                    />
                    <button className="botao-consulta-reserva" type="button">Pesquisar</button>
                </div>
                <div className="tabela">
                    <table>
                        <thead className="cabecalho">
                            <tr>
                                <th className="colunas-cabecalho">Nr Reserva</th>
                                <th className="colunas-cabecalho">Sala</th>
                                <th className="colunas-cabecalho">Usuário</th>
                                <th className="colunas-cabecalho">Turma</th>
                                <th className="colunas-cabecalho">Início</th>
                                <th className="colunas-cabecalho">Fim</th>
                                <th className="colunas-cabecalho">Status</th>
                                <th className="colunas-cabecalho">Observação</th>
                            </tr>
                        </thead>
                        <tbody className="contudo-tabela">
                            {reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                <td className="colunas-body">{reserva.id_reserva}</td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.sala.nm_sala}</button></td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.usuario.nm_usuario}</button></td>
                                <td className="colunas-body"><button className="button-coluna-body">{reserva.grade.turma.ds_turma}</button></td>
                                <td className="colunas-body">{new Date(reserva.dt_inicio).toLocaleString('default', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC'})}</td>
                                <td className="colunas-body">{new Date(reserva.dt_fim).toLocaleString('default', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC'})}</td>
                                <td className="colunas-body">{reserva.status.ds_status}</td>
                                <td className="colunas-body">{reserva.ds_observacao}</td>
                                <td className="colunas-body" style={{background: "#003d99"}}><button className="btn-editar">Editar</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>           
        </div>
       </Layout>
    );
}

export default ConsReserva;