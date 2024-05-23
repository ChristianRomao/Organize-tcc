import Layout from "../components/Layout";
import "../css/ConsReserva.css";

const ConsReserva = () => {
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
                        <option value="Tipos" >aaaaaaaaaa</option>
                        <option value="Tipos" >aaaaaaaaaa</option>
                    </select>
                    <input 
                        className="inputs-consulta-reserva"
                        type="search" 
                        name="" 
                        placeholder="Pesquise de cordo com o tipo"
                        id="" 
                    />
                    <button className="botao-consulta-reserva" type="button">Pesquisar</button>
                </div>
                <div className="tabela">
                    <table>
                        <thead className="cabecalho">
                            <tr>
                                <th>Nr Reserva</th>
                                <th>Sala</th>
                                <th>Usuário</th>
                                <th>Turma</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Status</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody className="contudo-tabela">
                            <tr>
                                <td>Reserva</td>
                                <td>Sala</td>
                                <td>Usuário</td>
                                <td>Turma</td>
                                <td>Data I</td>
                                <td>Data F</td>
                                <td>Status</td>
                                <td>Observação</td>
                                <td><button>editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>           
        </div>
       </Layout>
    );
}

export default ConsReserva;