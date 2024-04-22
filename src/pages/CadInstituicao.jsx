import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Cadastro de Instituição</h2>
      <form>
        <div>
          <p>Razão Social:</p>
          <input
            type="text"
            name="nm_razaosoc"
            value={instituicaoData.nm_razaosoc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>CPF/CNPJ:</p>
          <input
            type="text"
            name="cd_cpfcnpj"
            value={instituicaoData.cd_cpfcnpj}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Nome Fantasia:</p>
          <input
            type="text"
            name="nm_fantasia"
            value={instituicaoData.nm_fantasia}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" onSubmit={handleSubmit}>Cadastrar</button>
      </form>
    </div>
  );
}

export default CadInstituicao;