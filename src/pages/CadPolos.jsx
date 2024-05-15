import React from 'react';
import {  faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../css/CadPolos.css';
import LayoutCad from '../components/LayoutCad';


function CadPolos() {

  const handleSubmit = () => {

  }

  return (
    <LayoutCad title='Cadastro de Polo.' icon={faLocationDot}>
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
    </LayoutCad>
  );
}

export default CadPolos;