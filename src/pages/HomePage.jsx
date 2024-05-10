import './HomePage.css';
import LogoBranca from '../img/organize-branco.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faMagnifyingGlass, faPenToSquare, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {

    const [menuVisivel, setMenuVisivel] = useState(false);

    const toggleMenu = () => {
        setMenuVisivel(!menuVisivel);
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
                <nav className={menuVisivel ? "menu visible" : "menu"}>
                    <ul>
                        <li><a href="/perfil">Perfil</a></li>
                        <li><a href="/cadastro-instituição">Cadastro</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                    </ul>
                </nav>
            </header>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faPenToSquare} size='3x'/>
                            <text>Cadastro</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>  
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x'/>
                            <text>Consulta</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x'/>
                            <text>Reserva</text>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;