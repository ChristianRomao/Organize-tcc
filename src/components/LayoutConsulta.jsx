import HeaderComponents from "./HeaderComponents";
import '../css/Layout.css';
import { useNavigate } from "react-router-dom";

const LayoutConsulta = ({children, titleCons, tipoOptions, onSearch}) => {
    
    const navigate = useNavigate()
    
    return (
        <div>
            <HeaderComponents/>
            <body className='home-consulta'>
                <div className='body-layout-consulta'>
                    <div>
                        <button className='volta-consulta' onClick={()=>navigate(-1)}>
                            <p style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para o Inicio</p>
                        </button>
                    </div>
                    <div>
                        <text className='titulo-consulta'>{titleCons}</text>
                    </div>
                    <div className='area-consulta'>
                        <div className="grid-cons-reserva">
                            <select 
                                className="select-consulta-reserva" 
                                name="Tipo Filtro" 
                                id=""
                            >
                                <option value="Tipos" disabled selected hidden>Selecione</option>
                                {/* {tipoOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option> 
                                ))}    ===Aqui foi o gpt que deu um exemplo de se usar, se tu achar alguma outra solução ta dale===  */}
                            </select>
                            <input 
                                className="inputs-consulta-reserva"
                                type="search" 
                                name="Buscar" 
                                placeholder="Buscar"
                                id="" 
                            />
                            <button 
                                className="botao-consulta-reserva"  
                                type="button"   
                                onClick={onSearch}
                            >
                                Pesquisar
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default LayoutConsulta;