import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Reserva.css';
import { Grid, TextField } from '@mui/material';
import HeaderComponents from '../components/HeaderComponents';

function Reserva() {

  const handleSubmit = () => {

  }

  return (
    <div className='tudo'>
      <HeaderComponents/>
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
            <label className='titulo-inputs-reserva'>Insira o dia e a hora:</label>
              <div className='inputs-reserva'>
                <div className='input-individual'>
                  <input className='date-reserva' type="date" required/>
                  <input className='date-reserva' type="date" required/> 
                </div>
                <div className='input-individual'>
                  <input className='time-reserva' type="time" required/>
                  <input className='time-reserva' type="time" required/>
                </div>
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
