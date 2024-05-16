import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadInstituicao.css';
import {  faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import LayoutCad from '../components/LayoutCad';

function CadInstituicao() {
  const [instituicaoData, setInstituicaoData] = useState({
    nm_razaosoc: '',
    cd_cpfcnpj: '',
    nm_fantasia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstituicaoData({
      ...instituicaoData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/tcc/instituicao', instituicaoData)
      .then(response => {
        console.log(response.data);
        // Aqui você pode redirecionar o usuário para outra página ou mostrar uma mensagem de sucesso
      })
      .catch(error => {
        console.error('Erro ao cadastrar instituição:', error);
        // Aqui você pode mostrar uma mensagem de erro para o usuário
      });
  };

  return (
    <LayoutCad title='Cadastro de Instituição.' icon={faBuildingColumns}>
      <form className='Ajustes'>
        <div>
          <label className='titulo-inputs-inst'>Razão Social</label>
          <input
            className='inputs-inst'
            type="text"
            name="nm_razaosoc"
            value={instituicaoData.nm_razaosoc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='titulo-inputs-inst'>CPF/CNPJ</label>
          <input
            className='inputs-inst'
            type="text"
            name="cd_cpfcnpj"
            value={instituicaoData.cd_cpfcnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='titulo-inputs-inst'>Nome Fantasia</label>
          <input
            className='inputs-inst'
            type="text"
            name="nm_fantasia"
            value={instituicaoData.nm_fantasia}
            onChange={handleChange}
            required
          />
        </div>
        <button className='botao' type="submit" onSubmit={handleSubmit}>Cadastro Polos</button>
      </form>
    </LayoutCad>
  );
}

export default CadInstituicao;