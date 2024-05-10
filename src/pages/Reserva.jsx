import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoBranca from '../img/organize-branco.png';
import { faArrowLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './Reserva.css';
import { TextField } from '@mui/material';

function Reserva() {

  const handleSubmit = () => {

  }

  const [menuVisivel, setMenuVisivel] = useState(false);

  const toggleMenu = () => {
    setMenuVisivel(!menuVisivel);
  };

  return (
    <div className='tudo'>
      <header className="header-reserva">
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
      <body className='reserva-home'>
        <div className='reserva-body'>
          <button className='voltaHome-reserva'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
            <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
          </button>
          <div>
            <text className='titulo-reserva'>Faça a sua Reserva.</text>
          </div> 
          <div className='cadastro-reserva'>
            {/* <div className="icon-container-reserva">
              <FontAwesomeIcon icon={faLocationDot} style={{color: "#d6e7ff"}} className="large-icon"/>
            </div> */}
            <form className='ajustes-reserva'>
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
              </div>
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
                <TextField/>  
              </div>
              <button className='botao-reserva' type="submit" onSubmit={handleSubmit}>Fazer Reserva</button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Reserva;