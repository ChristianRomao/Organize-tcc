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
                    <button className="botao-consulta-reserva" type="button">Alterar conteúdo</button>
                </div>
            </div>           
        </div>
       </Layout>
    );
}

export default ConsReserva;