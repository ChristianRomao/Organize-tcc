import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderComponents from "./HeaderComponents";
import '../css/Layout.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = ({children, icon, title, next, noicon}) => {
    
    const navigate = useNavigate()
    const [hidden, setHidden] = useState(false);

    const handleNext = () => {
        if(next !== ""){
            navigate(`/cadastro-${next}`)
        }
    }

    useEffect(() => {
        const findSourceInChildren = (children) => {
            if (Array.isArray(children)) {
                children.forEach(child => findSourceInChildren(child));
            } else if (children && children.props && children.props.children) {
                findSourceInChildren(children.props.children);
            } else if (children && children._source) {
                if (children._source.fileName.includes("ConsReserva") || children._source.fileName.includes("CadGrade")) {
                    setHidden(true);
                }
            }
        };

        findSourceInChildren(children);
    }, [children]);

    return (
        <div>
            <HeaderComponents/>
            <body className='home'>
                <div className='body-layout'>
                    <div>
                        <button className='volta' onClick={()=>navigate(-1)}>
                            <p style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar</p>
                        </button>
                        {hidden ? <></> : (
                        <button className="proxima" onClick={handleNext}>
                            <p style={{color: "#d6e7ff", margin: "0em 1em"}}>Próximo</p>
                        </button>)}
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