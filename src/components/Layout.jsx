import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderComponents from "./HeaderComponents";
import '../css/Layout.css';
import { useNavigate } from "react-router-dom";

const Layout = ({children, icon, title, next, noicon}) => {
    
    const navigate = useNavigate()
    
    const handleNext = () => {
        console.log(next)
        if(next !== ""){
            navigate(`/cadastro-${next}`)
        }
    }
    
    return (
        <div style={{backgroundColor: "#C6D7EE"}}>
            <HeaderComponents/>
            <body className='home'>
                <div className='body-layout'>
                    <div>
                        <button className='volta' onClick={()=>navigate(-1)}>
                            <p style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar</p>
                        </button>
                        <button className="proxima" onClick={handleNext}>
                            <p style={{color: "#d6e7ff", margin: "0em 1em"}}>Próximo</p>
                        </button>
                    </div>
                    <div>
                        <text className='titulo'>{title}</text>
                    </div>
                    <div className='area-cadastro'>
                        {!noicon && <div className="icon-container">
                            <FontAwesomeIcon icon={icon} style={{ color: "#d6e7ff" }} className="large-icon" />
                        </div>}
                        {children}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Layout;