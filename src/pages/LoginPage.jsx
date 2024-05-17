import '../css/LoginPage.css';
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
        setSenhaVisivel(false);

        const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(!emailValid.test(email)) {
            setErro('Formato de e-mail inválido!');
        }else{
            setErro('');
        }
    }

    const handleSenhaChange = (event) => {
        const senha = event.target.value
        setSenha(senha);
        setSenhaInvalida(senha.trim() === '');

        if(senha.length < 8){
            setErro('Insira no mínimo 8 caracteres');
        }else{
            setErro('');
        }
    }
    
    const handleLogin = async () =>{
        try{
            if(!ds_email || !ds_senha){
                setEmailInvalido(ds_email.trim() === '');
                setSenhaInvalida(ds_senha.trim() === '');
            }   
            if(!erro){

                
                setSenhaVisivel(false)
                const loginData = {ds_email, ds_senha }
                const response = await axios.post('http://localhost:8080/login', loginData);
                console.log('Usuário autenticado:', response.data.token);
                
                navigate('/home')
            }
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
                    {console.log(erro)}
                    {console.log('Senha '+senhaInvalida)}
                    {console.log('Email '+emailInvalido)}
                    {!(senhaInvalida && emailInvalido) && (<span className='error-login' type='erro'>{erro ? erro : ''}</span>)}
                    <input className={`login ${emailInvalido ? 'input-invalido' : ''}`} type='email' placeholder={emailInvalido ? 'Email deve ser preenchido' : 'Digite seu Email'} onChange={handleEmailChange}/>
                    <div className='input-container'>
                        <input className={`login ${senhaInvalida ? 'input-invalido' : ''}`} type={senhaVisivel ? 'text' : 'password'} placeholder={senhaInvalida ? 'Senha deve ser preenchida' : 'Digite sua Senha'} onChange={handleSenhaChange} />
                        <span className="icon-eye" onClick={mostraSenha}>
                            {senhaVisivel ? 
                                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.5413 8.3764C21.445 8.43134 21.3387 8.46675 21.2287 8.48058C21.1186 8.49442 21.0069 8.48642 20.9 8.45703C20.793 8.42765 20.6929 8.37746 20.6054 8.30934C20.5178 8.24122 20.4446 8.15651 20.3898 8.06005L18.3863 4.55912C17.2215 5.34675 15.9366 5.94006 14.5816 6.31591L15.2006 10.0298C15.2189 10.1392 15.2154 10.251 15.1904 10.359C15.1655 10.467 15.1194 10.569 15.055 10.6592C14.9905 10.7494 14.909 10.826 14.8149 10.8847C14.7208 10.9433 14.6161 10.9829 14.5068 11.001C14.4618 11.0084 14.4163 11.0123 14.3707 11.0126C14.1712 11.0123 13.9782 10.9413 13.826 10.8121C13.6739 10.683 13.5725 10.5041 13.5398 10.3072L12.9314 6.66073C11.6483 6.83937 10.3466 6.83937 9.06347 6.66073L8.45503 10.3072C8.42229 10.5044 8.32056 10.6836 8.16799 10.8128C8.01541 10.942 7.82191 11.0128 7.62197 11.0126C7.57534 11.0124 7.5288 11.0086 7.48278 11.001C7.37343 10.9829 7.26873 10.9433 7.17467 10.8847C7.0806 10.826 6.99902 10.7494 6.93458 10.6592C6.87014 10.569 6.82411 10.467 6.79912 10.359C6.77412 10.251 6.77066 10.1392 6.78892 10.0298L7.41108 6.31591C6.05669 5.93887 4.77249 5.34449 3.60856 4.55596L1.61135 8.06005C1.55596 8.15657 1.4821 8.24123 1.39399 8.30921C1.30587 8.37718 1.20524 8.42714 1.09782 8.45622C0.990403 8.4853 0.878309 8.49294 0.767939 8.4787C0.65757 8.46446 0.551085 8.42862 0.454566 8.37323C0.358047 8.31784 0.273382 8.24398 0.205407 8.15587C0.137432 8.06776 0.0874778 7.96712 0.0583959 7.85971C0.0293139 7.75229 0.0216741 7.64019 0.0359127 7.52983C0.0501512 7.41946 0.0859892 7.31297 0.141381 7.21645L2.25037 3.52571C1.5096 2.88571 0.828416 2.17982 0.215195 1.41672C0.138722 1.33134 0.0804515 1.23127 0.0439405 1.12261C0.00742954 1.01396 -0.00655604 0.899004 0.00283779 0.784766C0.0122316 0.670528 0.0448078 0.559403 0.0985775 0.458174C0.152347 0.356944 0.226182 0.267734 0.315576 0.195989C0.404971 0.124244 0.508048 0.0714697 0.618516 0.0408869C0.728985 0.010304 0.844527 0.0025542 0.95809 0.018111C1.07165 0.0336678 1.18086 0.0722048 1.27903 0.131369C1.3772 0.190534 1.46229 0.269084 1.5291 0.362227C3.27956 2.52816 6.34182 5.10746 10.9964 5.10746C15.6509 5.10746 18.7132 2.525 20.4636 0.362227C20.5297 0.267178 20.6146 0.186736 20.713 0.125906C20.8115 0.0650756 20.9214 0.0251584 21.036 0.00863783C21.1505 -0.00788272 21.2673 -0.000653311 21.3789 0.0298763C21.4906 0.0604058 21.5947 0.113583 21.6849 0.186098C21.7751 0.258613 21.8495 0.348916 21.9033 0.451388C21.9571 0.55386 21.9892 0.666309 21.9977 0.781739C22.0062 0.897169 21.9909 1.01311 21.9526 1.12235C21.9144 1.23159 21.8541 1.33179 21.7754 1.41672C21.1622 2.17982 20.481 2.88571 19.7402 3.52571L21.8492 7.21645C21.9058 7.31266 21.9428 7.41915 21.958 7.52974C21.9731 7.64034 21.9662 7.75284 21.9375 7.86073C21.9089 7.96863 21.8591 8.06976 21.7911 8.15828C21.7231 8.2468 21.6382 8.32093 21.5413 8.3764Z" fill="black" fill-opacity="0.49"/>
                                </svg>
                            :
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.1514 12.8164C24.1172 12.8936 23.29 14.7285 21.4512 16.5674C19.001 19.0176 15.9062 20.3125 12.5 20.3125C9.09374 20.3125 5.99901 19.0176 3.54882 16.5674C1.70995 14.7285 0.878897 12.8906 0.848623 12.8164C0.804203 12.7165 0.78125 12.6084 0.78125 12.499C0.78125 12.3897 0.804203 12.2816 0.848623 12.1816C0.882803 12.1045 1.70995 10.2705 3.54882 8.43164C5.99901 5.98242 9.09374 4.6875 12.5 4.6875C15.9062 4.6875 19.001 5.98242 21.4512 8.43164C23.29 10.2705 24.1172 12.1045 24.1514 12.1816C24.1958 12.2816 24.2187 12.3897 24.2187 12.499C24.2187 12.6084 24.1958 12.7165 24.1514 12.8164ZM12.5 6.25C9.49413 6.25 6.86815 7.34277 4.69433 9.49707C3.80238 10.3841 3.04353 11.3956 2.4414 12.5C3.04337 13.6046 3.80223 14.616 4.69433 15.5029C6.86815 17.6572 9.49413 18.75 12.5 18.75C15.5058 18.75 18.1318 17.6572 20.3057 15.5029C21.1993 14.6163 21.9598 13.6048 22.5635 12.5C21.8594 11.1855 18.792 6.25 12.5 6.25ZM12.5 17.1875C11.5729 17.1875 10.6666 16.9126 9.89575 16.3975C9.1249 15.8824 8.52409 15.1504 8.1693 14.2938C7.81452 13.4373 7.72169 12.4948 7.90256 11.5855C8.08343 10.6762 8.52987 9.841 9.18543 9.18544C9.84099 8.52988 10.6762 8.08344 11.5855 7.90257C12.4948 7.7217 13.4373 7.81453 14.2938 8.16931C15.1503 8.5241 15.8824 9.12491 16.3975 9.89576C16.9126 10.6666 17.1875 11.5729 17.1875 12.5C17.1862 13.7428 16.6919 14.9343 15.8131 15.8131C14.9343 16.6919 13.7428 17.1862 12.5 17.1875ZM12.5 9.375C11.8819 9.375 11.2777 9.55828 10.7638 9.90166C10.2499 10.245 9.84939 10.7331 9.61287 11.3041C9.37634 11.8751 9.31446 12.5035 9.43504 13.1097C9.55561 13.7158 9.85324 14.2727 10.2903 14.7097C10.7273 15.1467 11.2841 15.4444 11.8903 15.565C12.4965 15.6855 13.1249 15.6236 13.6959 15.3871C14.2669 15.1506 14.755 14.7501 15.0983 14.2362C15.4417 13.7223 15.625 13.1181 15.625 12.5C15.625 11.6712 15.2957 10.8763 14.7097 10.2903C14.1236 9.70424 13.3288 9.375 12.5 9.375Z" fill="black" fill-opacity="0.49"/>
                                </svg> 
                            }
                        </span>
                    </div>
                    <button className='alterarsenha' type='button'>Alterar senha?</button>                 
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
