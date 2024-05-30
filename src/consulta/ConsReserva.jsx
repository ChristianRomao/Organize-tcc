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
                            <tr>
                                <td className="colunas-body">Reserva</td>
                                <td className="colunas-body">Sala</td>
                                <td className="colunas-body">Usuário</td>
                                <td className="colunas-body">Turma</td>
                                <td className="colunas-body">Data I</td>
                                <td className="colunas-body">Data F</td>
                                <td className="colunas-body">Status</td>
                                <td className="colunas-body">Observação</td>
                                <td className="colunas-body" style={{background: "#003d99"}}><button className="btn-editar">Editar</button></td>
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