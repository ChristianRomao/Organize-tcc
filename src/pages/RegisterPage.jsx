import { useState } from "react";
import "../css/RegisterPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [ds_email, setDs_email] = useState("");
  const [ds_senha, setDs_senha] = useState("");
  const [ds_senhaConfirm, setDs_senhaConfirm] = useState("");
  const [cd_cpfcnpj, setCd_cpfcnpj] = useState("");
  const [nm_usuario, setNm_usuario] = useState("");
  const [dt_nascimento, setDt_nascimento] = useState("");
  const [ds_funcao, setDs_funcao] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [success, setSuccess] = useState("");

  const validaEmailReg = (ds_email) => {
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailValid.test(ds_email)) {
      setErrorEmail("Formato de e-mail inválido!");
    } else {
      setErrorEmail("");
    }
  };

  const handleVoltaLogin = () => {
    if (
      ds_email !== "" ||
      ds_senha !== "" ||
      ds_senhaConfirm !== "" ||
      cd_cpfcnpj !== "" ||
      nm_usuario !== "" ||
      dt_nascimento !== "" ||
      ds_funcao !== ""
    ) {
      setShowAlert(true);
    } else {
      navigate(-1);
    }
  };

  const handleChange = (event) => {
    setError("");
    setErrorEmail("");
    setSuccess("");
    const { name, value } = event.target;
    switch (name) {
      case "ds_email":
        setDs_email(value);
        validaEmailReg(value);
        break;
      case "ds_senha":
        setDs_senha(value);
        break;
      case "ds_senhaConfirm":
        setDs_senhaConfirm(value);
        break;
      case "cd_cpfcnpj":
        if(value.length <= 14 && /^\d*$/.test(value)){
            setCd_cpfcnpj(value);
        }
        break;
      case "nm_usuario":
        setNm_usuario(value);
        break;
      case "dt_nascimento":
        setDt_nascimento(value);
        break;
      case "ds_funcao":
        setDs_funcao(value);
        break;
      default:
        break;
    }
  };

  const handleConfirmAlert = (confirm) => {
    if (confirm) {
      navigate(-1);
    } else {
      setShowAlert(false);
    }
  };

  const handleCadastroUsuarioValida = () => {
    let possuiErro = false;
    setConfirm(false);
    setError("");

    if (
        !nm_usuario ||
        !cd_cpfcnpj ||
        !dt_nascimento ||
        !ds_email ||
        !ds_senha ||
        !ds_senhaConfirm ||
        !ds_funcao
      ) {
        setError("Campos obrigatórios devem ser preenchidos!");
        possuiErro = true;
      }

      if (ds_senha !== ds_senhaConfirm) {
        setError("As senhas não conferem");
        possuiErro = true;
      }
        
      if(ds_senha.length < 8 || ds_senhaConfirm.length < 8) {
        setError("Senha deve conter no mínimo 8 caracteres");
        possuiErro = true;
      }

      if (errorEmail) {
        setError("Formato de e-mail inválido!");
        possuiErro = true;
      }

      if(!possuiErro){
        setConfirm(true);
        handleCadastroUsuario();
      }
}

  const handleCadastroUsuario = async () => {
    if(confirm && !error){
        const payload = {
        nm_usuario: nm_usuario,
        cd_cpfcnpj: cd_cpfcnpj,
        dt_nascimento: dt_nascimento,
        ds_email: ds_email,
        ds_senha: ds_senha,
        ds_funcao: ds_funcao,
        };
        try {
        const response = await axios.post(
            "http://localhost:8080/registro",
            payload
        );
        console.log(error)
        console.log(response.data);
        setNm_usuario('');
        setCd_cpfcnpj('');
        setDt_nascimento('');
        setDs_email('');
        setDs_senha('');
        setDs_senhaConfirm('');
        setDs_funcao('');
        setError('');
        setSuccess(response.data.message);
        setTimeout(() =>{
            setSuccess('');
        },5000)
        } catch (erro) {
        console.log(erro.response.data);
        if(!error){
            setError(erro.response.data.error);
        }
        }
    }
  };

  return (
    <div>
      <body className="main">
        <div className="area-registro">
          <p className="titulo-principal">Faça seu registro</p>
          <div className="conteudo-form">
            <label
              className={
                error && !nm_usuario ? "titulo-inputs-error" : "titulo-inputs"
              }
            >
              Digite seu nome
            </label>
            <input
              className="inputs-registro"
              placeholder="Nome Completo"
              type="text"
              name="nm_usuario"
              onChange={handleChange}
              value={nm_usuario}
            />

            <label
              className={
                error && !cd_cpfcnpj ? "titulo-inputs-error" : "titulo-inputs"
              }
            >
              Digite seu CPF/CNPJ
            </label>
            <input
              className="inputs-registro"
              placeholder="CPF/CNPJ"
              type="text"
              name="cd_cpfcnpj"
              onChange={handleChange}
              value={cd_cpfcnpj}
            />

            <label
              className={
                error && !dt_nascimento
                  ? "titulo-inputs-error"
                  : "titulo-inputs"
              }
            >
              Data de Nascimento
            </label>
            <input
              className="inputs-registro"
              type="date"
              name="dt_nascimento"
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              value={dt_nascimento}
            />

            <label
              className={
                (error && !ds_email) || errorEmail
                  ? "titulo-inputs-error"
                  : "titulo-inputs"
              }
            >
              Insira seu Email
            </label>
            <input
              className="inputs-registro"
              placeholder="exemplo@email.com"
              onChange={handleChange}
              value={ds_email}
              type="email"
              name="ds_email"
            />

            <label
              className={
                (error && !ds_senha) || !confirm
                  ? "titulo-inputs-error"
                  : "titulo-inputs"
              }
            >
              Insira sua Senha
            </label>
            <input
              className="inputs-registro"
              placeholder="********"
              type="password"
              name="ds_senha"
              onChange={handleChange}
              value={ds_senha}
            />

            <label
              className={
                (error && !ds_senhaConfirm) || !confirm
                  ? "titulo-inputs-error"
                  : "titulo-inputs"
              }
            >
              Confirme sua Senha
            </label>
            <input
              className="inputs-registro"
              placeholder="********"
              type="password"
              name="ds_senhaConfirm"
              onChange={handleChange}
              value={ds_senhaConfirm}
            />

            <label
              className={
                error && !ds_funcao ? "titulo-inputs-error" : "titulo-inputs"
              }
            >
              Função do usuário
            </label>
            <input
              className="inputs-registro"
              placeholder="Função Usuário"
              type="text"
              name="ds_funcao"
              onChange={handleChange}
              value={ds_funcao}
            />
            <div>
              <text
                className={
                  error || errorEmail
                    ? "message-registro-error"
                    : success
                    ? "message-registro-success"
                    : ""
                }
              >
                {"" || error || errorEmail || success}
              </text>
            </div>

            <div>
              <button
                className="voltar"
                type="button"
                onClick={handleVoltaLogin}
              >
                Voltar
              </button>
              <button
                disabled = {!!error || !!errorEmail || !confirm}
                className="btn-registro"
                type="button"
                onClick={handleCadastroUsuarioValida}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </body>
      {showAlert && (
        <div className="return-login-alert-overlay">
          <div className="return-login-alert">
            <div className="return-login-alert-body">
              <h1>ATENÇÃO!</h1>
              <p>
                Possui(em) campo(s) preenchido(s).
                <br />
                Deseja voltar?
              </p>
              <div className="return-login-alert-button-group">
                <button onClick={() => handleConfirmAlert(true)}>Sim</button>
                <button onClick={() => handleConfirmAlert(false)}>Não</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
