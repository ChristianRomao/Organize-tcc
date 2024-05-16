import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderComponents from "./HeaderComponents";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import '../css/LayoutCad.css';

const LayoutCad = ({children, icon, title}) => {
    return (
        <div>
            <HeaderComponents/>
            <body className='home'>
                <div className='body-layout'>
                    <button className='voltaHome'>
                        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
                        <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
                    </button>
                    <div>
                        <text className='titulo'>{title}</text>
                    </div>
                    <div className='area-cadastro'>
                        <div className="icon-container">
                            <FontAwesomeIcon icon={icon} style={{ color: "#d6e7ff" }} className="large-icon" />
                        </div>
                        {children}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default LayoutCad;