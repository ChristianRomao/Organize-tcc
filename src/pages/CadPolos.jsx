import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../css/CadPolos.css';
import HeaderComponents from '../components/HeaderComponents';


function CadPolos() {

  const handleSubmit = () => {

  }

  return (
    <div>
      <HeaderComponents/>
      <body className='polo-home'>
        <div className='body-body'>
          <button className='voltaHome-polo'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
            <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
          </button>
          <div>
            <text className='titulo-polo'>Cadastro de Polo.</text>
          </div> 
          <div className='cadastro-polo'>
            <div className="icon-container-polo">
              <FontAwesomeIcon icon={faLocationDot} style={{color: "#d6e7ff"}} className="large-icon"/>
            </div>
            <form className='ajustes-polo'>
            <div>
                <label className='titulo-inputs-polo'>Instituição</label>
                <input
                  className='inputs-polo disable'
                  type="text"
                  name="nm_razaosoc"
                  required
                />
              </div>
              <div>
                <label className='titulo-inputs-polo'>Nome do Polo</label>
                <input
                  className='inputs-polo'
                  type="text"
                  name="nm_razaosoc"
                  required
                />
              </div>
              <div>
                <label className='titulo-inputs-polo'>Endereço do Local</label>
                <input
                  className='inputs-polo'
                  type="text"
                  name="cd_cpfcnpj"
                  required
                />
              </div>
              <div>
                <label className='titulo-inputs-polo'>Município</label>
                <input
                  className='inputs-polo'
                  type="text"
                  name="nm_fantasia"
                  required
                />
              </div>
              <button className='botao-polo' type="submit" onSubmit={handleSubmit}>Cadastro Blocos</button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default CadPolos;