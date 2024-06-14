import LogoBranca from '../img/organize-branco.png';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Header.css';
import { useState } from 'react';
import { useAuth } from '../AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderComponents = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isLayoutConsulta = location.pathname.startsWith(`/consulta`);

    const [menuVisivel, setMenuVisivel] = useState(false);

    const toggleMenu = () => {
      setMenuVisivel(!menuVisivel);
    };

    const handleLogOut = () =>{
        logout();
        navigate('/login');
    }

    const handleLogoOrganizze = () => {
        navigate('/home');
    };

    
    
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