import './LoginPage.css';
import LogoBranca from '../img/organize-branco.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [ds_email, setEmail] = useState('');
    const [ds_senha, setSenha] = useState('');
    const [emailInvalido, setEmailInvalido] = useState(false);
    const [senhaInvalida, setSenhaInvalida] = useState(false);
    const [erro, setErro] = useState('');

    const handleEmailChange = (event) => {
        const email = event.target.value
        setEmail(email);
        setEmailInvalido(email.trim() === '');
        setErro('');
    }

    const handleSenhaChange = (event) => {
        const senha = event.target.value
        setSenha(senha)
        setSenhaInvalida(senha.trim() === '');
        setErro('');
    }
    
    const handleLogin = async () =>{
        try{
            if(!ds_email || !ds_senha){
                setEmailInvalido(ds_email.trim() === '');
                setSenhaInvalida(ds_senha.trim() === '');
            }
                const loginData = {ds_email, ds_senha }
                const response = await axios.post('http://localhost:8080/login', loginData);
                console.log('Usuário autenticado:', response.data);


                navigate('/home')
        }catch(error){
            setErro(error.response.data);
        }
    }

    const handleRegistro = async () =>{
        navigate('/registro')
        
    }
    
    const mostraSenha = () => {
        setSenhaVisivel(!senhaVisivel)
    }

    return (
        <div className="body">
            <div className="container-left">
                <div className="container-icon">
                    <svg width="231" height="231" viewBox="0 0 231 231" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="115.5" cy="115.5" r="115.5" fill="#C6D7EE"/>
                        <path d="M115.5 57.8333C122.617 57.8333 129.442 60.6604 134.474 65.6926C139.506 70.7249 142.333 77.55 142.333 84.6667C142.333 91.7833 139.506 98.6085 134.474 103.641C129.442 108.673 122.617 111.5 115.5 111.5C108.383 111.5 101.558 108.673 96.5259 103.641C91.4937 98.6085 88.6666 91.7833 88.6666 84.6667C88.6666 77.55 91.4937 70.7249 96.5259 65.6926C101.558 60.6604 108.383 57.8333 115.5 57.8333ZM115.5 124.917C145.151 124.917 169.167 136.925 169.167 151.75V165.167H61.8333V151.75C61.8333 136.925 85.8491 124.917 115.5 124.917Z" fill="#002a4d"/>
                    </svg>
                </div>
                <div className='box-input'>
                    <text style={{color: '#D9D9D9', fontWeight: 'bold'}}>Informe seu Login</text>
                    {!senhaInvalida && !emailInvalido && (<span className='error-login' type='erro'>{erro ? erro : ''}</span>)}
                    <input className={`login ${emailInvalido ? 'input-invalido' : ''}`} type='email' placeholder={emailInvalido ? 'Email deve ser preenchido' : 'Digite seu Email'} onChange={handleEmailChange}/>
                    <div>
                        <input className={`login ${senhaInvalida ? 'input-invalido' : ''}`} type='password' placeholder={senhaInvalida ? 'Senha deve ser preenchida' : 'Digite sua Senha'} onChange={handleSenhaChange}/>
                    </div>
                    <button className='alterarsenha' type='button'>Alterar sua senha?</button>                 
                </div>
                <div className='container-btn'>
                    <button className='loginBT' type='button' onClick={handleLogin}>Entrar</button>
                    <button className='registerBT' type='button' onClick={handleRegistro}>Registrar</button>
                </div>
            </div>
            <div className="container-right ">
                <div className='sobre'>
                    <h1 className='titulo-sobre'>Quem somos?</h1>
                    <text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</text>
                </div>
                <img className='logo-branca' src={LogoBranca} alt="Logo branca Organize"/>
            </div>
      </div>
    );
}

export default LoginPage;
