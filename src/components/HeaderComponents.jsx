import LogoBranca from '../img/organize-branco.png';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Header.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const HeaderComponents = () => {

    const token = localStorage.getItem("token");

    const {logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isLayoutConsulta = location.pathname.startsWith(`/consulta`);

    const [menuVisivel, setMenuVisivel] = useState(false);

    const [nm_usuarioLogged, setNm_usuarioLogged] = useState("");
    const [ds_funcaoLogged, setDs_funcaoLogged] = useState("");

    const toggleMenu = () => {
      setMenuVisivel(!menuVisivel);
    };

    const handleLogOut = () =>{
        logout();
        setNm_usuarioLogged("");
        navigate('/login');
    }

    const handleLogoOrganizze = () => {
        navigate('/home');
    };

    useEffect(() => {
        const decode = jwtDecode(token);
        setNm_usuarioLogged(decode.nm_usuario);
        setDs_funcaoLogged(decode.ds_funcao);
      },[token]);
    
    return (
        <header className="header">
            <img 
                className='logo-branco resized-logo' 
                src={LogoBranca} 
                alt="Logo branca Organize"
                onClick={handleLogoOrganizze}
            />
            {!isLayoutConsulta ? (
                <button className="menu-button" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faRightFromBracket} size='2x'/>
                </button>
            ):(
                <button className="menu-button" onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} size='2x'/>
                </button>
            )}
            <div className={ds_funcaoLogged === 'admin' ? 'info-user-admin' : 'info-user'}>
                <FontAwesomeIcon icon={faUser} size='2x'/>
                <text className='text-user-info'>{nm_usuarioLogged}</text>
            </div>
            <nav className={menuVisivel ? "menu visible" : "menu"}>
                <ul>
                    <li>
                        <button className='logout' onClick={handleLogOut}>Log Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponents;