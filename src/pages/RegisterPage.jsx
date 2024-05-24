import { useState } from 'react';
import '../css/RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [ds_email, setDs_email] = useState('');
    const [ds_senha, setDs_senha] = useState('');
    const [cd_cpfcnpj, setCd_cpfcnpj] = useState('');
    const [nm_usuario, setNm_usuario] = useState('');
    const [dt_nascimento, setDt_nascimento] = useState('');
    const [ds_funcao, setDs_funcao] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validaEmailReg = (ds_email) => {
        const validaEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return validaEmail.test(ds_email);
    }

    const handleVoltaLogin = () => {
        // if(ds_email !== "" || ds_senha !== "" || cd_cpfcnpj !== "" || nm_usuario !== "" || dt_nascimento !== "" || ds_funcao !== ""){
        //     confirmAlert({
        //         title: "Confirmação",
        //         message: "Possue campos preenchidos. Deseja Voltar?",
        //         buttons: [
        //             {
        //                 label: "Sim",
        //                 onClick: navigate('/login')
        //             },
        //             {
        //                 label: "Não",
        //                 onClick: ()=>{}
        //             }
        //         ],
        //         closeOnEscape: true,
        //         closeOnClickOutside: true
        //     })
        // }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch (name) {
            case "ds_email":
                setDs_email(value)
                setIsValid(validaEmailReg(value));
                break;
            case "ds_senha":
                setDs_senha(value)
                break;
            case "cd_cpfcnpj":
                setCd_cpfcnpj(value)
                break;
            case "nm_usuario":
                setNm_usuario(value)
                break;
            case "dt_nascimento":
                setDt_nascimento(value)
                break;
            case "ds_funcao":
                setDs_funcao(value)
                break;
        }
    }

    return (
        <div>
            <body className='main'>
                <div className='area-registro'>
                    <p className='titulo-principal'>Faça seu registro</p>
                    <div className='conteudo-form'>
                        <label className='titulo-inputs'>Digite seu nome</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='Seu Nome Completo' 
                            type="text"
                            name="nm_usuario"
                            onChange={handleChange} 
                            value={nm_usuario}
                        />

                        <label className='titulo-inputs'>Digite seu CPF/CNPJ</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='CPF/CNPJ' 
                            type="text" 
                            name="cd_cpfcnpj"
                            onChange={handleChange} 
                            value={cd_cpfcnpj}
                        />
                        
                        <label className='titulo-inputs'>Data de Nascimento</label>
                        <input 
                            className='inputs-registro' 
                            type="date" 
                            name="dt_nascimento"
                            onChange={handleChange} 
                            value={dt_nascimento}
                        />
                        
                        <label className='titulo-inputs'>Insira seu Email</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='exemplo@email.com' 
                            onChange={handleChange} 
                            value={ds_email} 
                            type="email"
                            name="ds_email"
                        />

                        
                        <label className='titulo-inputs'>Insira sua Senha</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='Exem1234' 
                            type="text" 
                            name="ds_senha"
                            onChange={handleChange} 
                            value={ds_senha}
                        />

                        <label className='titulo-inputs'>Confirme sua Senha</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='Exem1234' 
                            type="text" 
                            name="ds_senha"
                            onChange={handleChange} 
                            value={ds_senha}
                        />
                        
                        <label className='titulo-inputs'>Função do usuário</label>
                        <input 
                            className='inputs-registro' 
                            placeholder='Função Usuário' 
                            type="text"
                            name="ds_funcao"
                            onChange={handleChange} 
                            value={ds_funcao}
                        />
                        <div>
                            <button className='voltar-login' type="button" onClick={handleVoltaLogin}>Login</button>
                            <button className='btn-registro' type="button">Registrar</button>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default RegisterPage;