import LogoBranca from '../img/organize-branco.png';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Header.css';
import { useState } from 'react';

const HeaderComponents = () => {

    const [menuVisivel, setMenuVisivel] = useState(false);

    const toggleMenu = () => {
      setMenuVisivel(!menuVisivel);
    };

    return (
        <header className="header">
            <img 
                className='logo-branco resized-logo' 
                src={LogoBranca} 
                alt="Logo preta Organize"
            />
            <button className="menu-button" onClick={toggleMenu}><FontAwesomeIcon icon={faUserAlt} size='2x'/></button>
            <nav className={menuVisivel ? "menu visible" : "menu"}>
                <ul>
                    <li><a href="/perfil">Perfil</a></li>
                    <li><a href="/cadastro-instituição">Cadastro</a></li>
                    <li><a href="/perfil">Perfil</a></li>
                    <li><a href="/perfil">Perfil</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponents;