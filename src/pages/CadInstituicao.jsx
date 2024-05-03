import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoBranca from '../img/organize-branco.png';
import { faArrowLeft, faBuildingColumns, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './CadInstituicao.css';


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

  const [menuVisivel, setMenuVisivel] = useState(false);

  const toggleMenu = () => {
    setMenuVisivel(!menuVisivel);
  };

  return (
    <div className='tudo'>
      <header className="header-inst">
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
      <body className='inst-home'>
        <div className='body-body'>
          <button className='voltaHome'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#d6e7ff", margin: "0em 1em"}} />
            <a href="/home" style={{color: "#d6e7ff", margin: "0em 1em"}}>Voltar para a tela Inicial</a>
          </button>
          <div>
            <text className='titulo-Inst'>Cadastro de Instituição</text>
          </div> 
          <div className='area-cadastro'>
            <div className="icon-container ">
              <FontAwesomeIcon icon={faBuildingColumns} style={{color: "#d6e7ff"}} className="large-icon"/>
            </div>
            <form className='ajustes'>
              <div>
                <p className='titulo-inputs'>Razão Social:</p>
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
                <p className='titulo-inputs'>CPF/CNPJ:</p>
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
                <p className='titulo-inputs'>Nome Fantasia:</p>
                <input
                  className='inputs-inst'
                  type="text"
                  name="nm_fantasia"
                  value={instituicaoData.nm_fantasia}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='botao' type="submit" onSubmit={handleSubmit}>Cadastrar</button>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default CadInstituicao;