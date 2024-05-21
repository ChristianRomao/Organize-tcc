import { useState } from 'react';
import '../css/RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {

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
                    <text className='titulo-principal'>Faça seu registro em <br/> nossa plataforma</text>
                    <div>
                        <label className='titulo-inputs'>Digite seu nome</label>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" onChange={handleChange} value={nm_usuario}/>

                        <label className='titulo-inputs'>Digite seu CPF/CNPJ</label>
                        <input className='inputs-registro' placeholder='CPF/CNPJ' type="text" onChange={handleChange} value={cd_cpfcnpj}/>
                        
                        <label className='titulo-inputs'>Seu Nascimento</label>
                        <input className='inputs-registro' type="date" onChange={handleChange} value={dt_nascimento}/>
                        
                        <label className='titulo-inputs'>Insira seu Email</label>
                        <div className='email-input-container'>
                            <input className='inputs-registro' placeholder='exemplo@email.com' onChange={handleChange} value={ds_email} type="email" />
                            {ds_email && (isValid ? (
                                <FontAwesomeIcon className='edit-icon' icon={faCheck} style={{color: "#00ff15",}} />
                            ) : (
                                <FontAwesomeIcon className='edit-icon' icon={faCircleExclamation} style={{color: "#ff0000",}} />
                            ))}
                        </div>
                        
                        <label className='titulo-inputs'>Insira seu Email</label>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" />
                        
                        <label className='titulo-inputs'>Insira seu Email</label>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" />
                    </div>
                </div>
            </body>
        </div>
    );
}

export default RegisterPage;