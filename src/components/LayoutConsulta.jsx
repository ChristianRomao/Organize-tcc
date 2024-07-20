import HeaderComponents from "./HeaderComponents";
import '../css/LayoutConsulta.css';
import { useLocation, useNavigate } from "react-router-dom";

const LayoutConsulta = ({children, titleCons, tipoOptions, onSearch}) => {
    
    const location = useLocation();
    const isGradePage = location.pathname === '/consulta-grade';

    const navigate = useNavigate();
    
    return (
        <div style={{backgroundColor: "#00183a"}}>
            <HeaderComponents/>
            <body className='home-consulta'>
                <div className='body-layout-consulta'>
                    <div>
                        <text className='titulo-consulta'>{titleCons}</text>
                    </div>
                    <button     
                            className='volta-consulta'  
                            style={{color: "#d6e7ff"}} 
                            onClick={()=>navigate(-1)}
                        >
                        Voltar
                    </button>
                    {/* <div className="grid-consulta">
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
                            <option value="Tipos" disabled selected hidden>Tipo</option>
                            {/* {tipoOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option> 
                            ))}    ===Aqui foi o gpt que deu um exemplo de se usar, se tu achar alguma outra solução ta dale===
                        </select>
                        <input 
                            className="inputs-consulta"
                            type="search" 
                            name="Buscar" 
                            placeholder="Buscar pelo tipo"
                            id="" 
                        />
                        <button 
                            className="botao-consulta"  
                            type="button"   
                            onClick={onSearch}
                        >
                            Pesquisar
                        </button>
                    </div> */}
                    <div className={`area-consulta ${isGradePage ? 'grade-area-consulta' : ''}`}>
                        {children}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default LayoutConsulta;