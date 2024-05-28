import { useNavigate } from "react-router-dom";
import HeaderComponents from "../components/HeaderComponents";
import "../css/CadMateriais.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CadMateriais = () => {
  const navigate = useNavigate();

  return (
    <div className="tudo">
      <HeaderComponents />
      <body className="materiais-home">
        <div className="materiais-body">
          <div>
            <button className="voltaHome">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate(-1)}
              >
                Voltar
              </p>
            </button>
            <button className="vaiConsulta">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate("/consulta-materiais")}
              >
                Ir para Consulta
              </p>
            </button>
          </div>
          <div className="body-content">
            <div className="cadastro-materiais">
              <div className="titulo-materiais-div">
                <text className="titulo-materiais">Cadastro de Materiais</text>
              </div>
              <div className="body-content-form">
                <div className="icon-content">
                    <FontAwesomeIcon icon={faPen}/>
                </div>
                <div >
                  <form className="ajustes-materiais">
                  <div>
                    <label className="titulo-inputs-materiais">Turma</label>
                    <select
                      className="inputs-materiais"
                      id=""
                      name="id_instituicao"
                      value={{}}
                      onChange={{}}
                      required
                    >
                      <option value="">Selecione a Turma</option>
                      {/* {instituicoes.map((instituicao) => (
                        <option
                          key={instituicao.id_instituicao}
                          value={instituicao.id_instituicao}
                        >
                          {instituicao.nm_fantasia}
                        </option>
                      ))} */}
                    </select>
                  </div>
                  <div>
                    <label className="titulo-inputs-materiais">Disciplina</label>
                    <select
                      className="inputs-materiais"
                      id=""
                      name="id_instituicao"
                      value={{}}
                      onChange={{}}
                      required
                    >
                      <option value="">Selecione a Disciplina</option>
                      {/* {instituicoes.map((instituicao) => (
                        <option
                          key={instituicao.id_instituicao}
                          value={instituicao.id_instituicao}
                        >
                          {instituicao.nm_fantasia}
                        </option>
                      ))} */}
                    </select>
                  </div>
                    <div>
                      <label className="titulo-inputs-materiais">
                        Nome do Professor
                      </label>
                      <input
                        className="inputs-materiais"
                        type="text"
                        name=""
                        value={{}}
                        onChange={{}}
                        required
                      />
                    </div>
                    <div>
                      <label className="titulo-inputs-materiais">
                        Carga Horária
                      </label>
                      <input
                        className="inputs-materiais"
                        type="text"
                        name=""
                        value={{}}
                        onChange={{}}
                        required
                      />
                    </div>
                    <div>
                      <label className="titulo-inputs-materiais">
                        Quantidade de alunos
                      </label>
                      <input
                        className="inputs-materiais"
                        type="text"
                        name=""
                        value={{}}
                        onChange={{}}
                        required
                      />
                    </div>
                  <button
                    className="botao-materiais"
                    type="button"
                    onClick={{}}
                    >
                    Gravar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="descricao-materiais">
              <text className="titulo-descricao">Materiais no Estoque</text>
              <div>
                {/* aqui da bom coloca as infos, mas ai só ajustar o css e boa. */}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default CadMateriais;
