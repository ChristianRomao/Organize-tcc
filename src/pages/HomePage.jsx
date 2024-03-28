import './HomePage.css';
import LogoBranca from '../img/organize-branco.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faChalkboardUser, faGraduationCap, faUserAlt } from '@fortawesome/free-solid-svg-icons';

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
                        <li><a href="/perfil">Cadastro</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                        <li><a href="/perfil">Perfil</a></li>
                    </ul>
                </nav>
            </header>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faGraduationCap} size='3x'/>
                            <text>Polos</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faBookOpen} size='3x'/>
                            <text>Cursos</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faChalkboardUser} size='3x'/>
                            <text>Disciplinas</text>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;