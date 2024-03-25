import './HomePage.css';
import LogoBranca from '../img/organize-branco.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div>
            <header className="header-home">
                <img 
                    className='logo-branco resized-logo' 
                    src={LogoBranca} 
                    alt="Logo preta Organize"
                />
                <button className="menu-button" onClick={toggleMenu}><FontAwesomeIcon icon={faUserAlt} size='2x'/></button>
                <nav className={menuVisible ? "menu visible" : "menu"}>
                    <ul>
                        <li><a href="/perfil">Perfil</a></li>
                        <li><a href="/perfil">Cadastro</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                    </ul>
                </nav>
            </header>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        TESTE
                    </div>
                    <div className='item-da-grid'>
                        TESTE
                    </div>
                    <div className='item-da-grid'>
                        TESTE
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;