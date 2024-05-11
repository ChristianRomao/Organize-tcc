import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Reserva.css';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import HeaderComponents from '../components/HeaderComponents';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );
}

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
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
              </div>
              <div>
                <input className='date-reserva' type="date" required/>
                <input className='time-reserva' type="time" required/>
                <TextField id="filled-basic" label="Filled" variant="outlined" size='small' InputProps={{style: {backgroundColor: "red"}}}/>  
              </div>
              <DemoItem
                label={
                  <Label
                    componentName="DateRangePicker"
                    valueType="date range"
                    isProOnly
                  />
                }
                component="DateRangePicker"
              >
                <DateRangePicker
                  localeText={{
                    start: '',
                    end: '',
                  }}
                />
              </DemoItem>
              <button className='botao-reserva' type="submit" onSubmit={handleSubmit}>Fazer Reserva</button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Reserva;
