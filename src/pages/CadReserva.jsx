import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/Reserva.css';
import HeaderComponents from '../components/HeaderComponents';

const CadReserva = () => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
            <text className='titulo-reserva'>Faça a sua Reserva</text>
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
              <div className='inputs-reserva'>
                <div className='select-individual'>
                  <label className='titulo-selects-reserva'>Escolha o Polo:</label>
                  <select className='selects-reserva' id="" name="Polos" value={selectedOption} onChange={handleSelectChange}>
                    <option value="Polo 1">Polo 1</option>
                  </select>
                </div>
                <div className='select-individual'>
                  <label className='titulo-selects-reserva'>Escolha a Sala:</label>
                  <select className='selects-reserva' id="" name="Salas" value={selectedOption} onChange={handleSelectChange}>
                    <option value="Polo 1">Bloco D, Sala D10</option>
                  </select>
                </div>
              </div>
              <div className='inputs-reserva'>
                <div className='select-individual'>
                  <label className='titulo-selects-reserva'>Responsavel pela Sala:</label>
                  <select className='selects-reserva' id="" name="Responsavel" value={selectedOption} onChange={handleSelectChange}>
                    <option value="Polo 1">Pedro</option>
                  </select>
                </div>
                <div className='select-individual'>
                  <label className='titulo-selects-reserva'>Selecione a Grade:</label>
                  <select className='selects-reserva' id="" name="Grade" value={selectedOption} onChange={handleSelectChange}>
                  <option value="Polo 1">Não sei</option>
                  </select>
                </div>
              </div>
              <button className='botao-reserva' type="submit" onSubmit={handleSubmit}>Fazer Reserva</button>
            </form>
          </div>
          <div className='descricao-reserva'>
              <text className='titulo-descricao'>Detalhes da Reserva</text>
              <div>
                {/* aqui da bom coloca as infos, mas ai só ajustar o css e boa. */}
              </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default CadReserva;
