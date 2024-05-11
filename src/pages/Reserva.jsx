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
              <Grid container  justifyContent="center" spacing={1}>
                <Grid item md={8}>
                  <input className='date-reserva' type="date" required/>
                </Grid>
                <Grid item md={3}>
                  <input className='time-reserva' type="time" required/>
                </Grid>
                <Grid item md={8}>
                  <input className='date-reserva' type="date" required/>  
                </Grid>
                <Grid item md={3}>
                  <input className='time-reserva' type="time" required/>
                </Grid>
                <Grid item md={6}>
                <TextField
                  helperText="Selecione o polo desejado"
                  id="filled-basic"
                  label="Polo"
                  variant="outlined"
                  InputProps={{style: {backgroundColor: "#d6e7ff"}}}
                />
                  <button className='botao-reserva' type="submit" onSubmit={handleSubmit}>Fazer Reserva</button>
                </Grid>
                {/* <div>
                  <TextField id="" label="Filled" variant="outlined" 'size='small />  
                </div> */}
              </Grid>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Reserva;
