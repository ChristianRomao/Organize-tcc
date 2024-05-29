import HeaderComponents from "./HeaderComponents";
import '../css/LayoutConsulta.css';
import { useNavigate } from "react-router-dom";

const LayoutConsulta = ({children, titleCons, tipoOptions, onSearch}) => {
    
    const navigate = useNavigate()
    
    return (
        <div>
            <HeaderComponents/>
            <body className='home-consulta'>
                <div className='body-layout-consulta'>
                    <div>
                        <text className='titulo-consulta'>{titleCons}</text>
                    </div>
                    <div className="grid-consulta">
                        <div>
                            <button     
                                className='volta-consulta'  
                                style={{color: "#d6e7ff"}} 
                                onClick={()=>navigate(-1)}
                            >
                                Voltar
                            </button>
                        </div>
                        <select 
                            className="select-consulta" 
                            name="Tipo Filtro" 
                            id=""
                        >
                            <option value="Tipos" disabled selected hidden>Selecione</option>
                            {/* {tipoOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option> 
                            ))}    ===Aqui foi o gpt que deu um exemplo de se usar, se tu achar alguma outra solução ta dale===  */}
                        </select>
                        <input 
                            className="inputs-consulta"
                            type="search" 
                            name="Buscar" 
                            placeholder="Buscar"
                            id="" 
                        />
                        <button 
                            className="botao-consulta"  
                            type="button"   
                            onClick={onSearch}
                        >
                            Pesquisar
                        </button>
                    </div>
                    <div className='area-consulta'>
                        {children}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default LayoutConsulta;