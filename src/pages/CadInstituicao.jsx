import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadInstituicao.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';

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
    <div>
      <HeaderComponents/>
      <body className='inst-home'>
        <div className='body-body'>
          <button className='voltaHome'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
            <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
          </button>
          <div>
            <text className='titulo-Inst'>Cadastro de Instituição.</text>
          </div> 
          <div className='area-cadastro'>
            <div className="icon-container ">
              <FontAwesomeIcon icon={faBuildingColumns} style={{color: "#d6e7ff"}} className="large-icon"/>
            </div>
            <form className='Ajustes'>
              <div>
                <label className='titulo-inputs'>Razão Social</label>
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
                <label className='titulo-inputs'>CPF/CNPJ</label>
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
                <label className='titulo-inputs'>Nome Fantasia</label>
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
          </div>
        </div>
      </body>
    </div>
  );
}

export default CadInstituicao;