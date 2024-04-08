import { useState } from 'react';
import './RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const RegisterPage = () => {

    const [email, setEmail] = useState();
    const [isValid, setIsValid] = useState(true);

    const validaEmailReg = (email) => {
        const validaEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return validaEmail.test(email);
    }

    const handleChange = (event) => {
        const {value} = event.target
        setEmail(value)
        setIsValid(validaEmailReg(value));
    }

    return (
        <div>
            <body className='main'>
                <div className='area-registro'>
                    <text className='titulo-principal'>Faça seu registro em <br/> nossa plataforma.</text>
                    <div>
                        <text className='titulo-inputs'>Insira seu Email</text>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text"/>
                        <text className='titulo-inputs'>Insira seu Email</text>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" />
                        <text className='titulo-inputs'>Seu Nascimento</text>
                        <input className='inputs-registro' type="date" />
                        <text className='titulo-inputs'>Insira seu Email</text>
                        <div className='email-input-container'>
                            <input className='inputs-registro' placeholder='exemplo@email.com' onChange={handleChange} value={email} type="email" />
                            {email && (isValid ? (
                                <FontAwesomeIcon className='edit-icon' icon={faCheck} style={{color: "#00ff15",}} />
                            ) : (
                                <FontAwesomeIcon className='edit-icon' icon={faCircleExclamation} style={{color: "#ff0000",}} />
                            ))}
                        </div>
                        <text className='titulo-inputs'>Insira seu Email</text>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" />
                        <text className='titulo-inputs'>Insira seu Email</text>
                        <input className='inputs-registro' placeholder='Seu Nome' type="text" />
                    </div>
                </div>
            </body>
        </div>
    );
}

export default RegisterPage;