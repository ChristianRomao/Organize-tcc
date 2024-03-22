import './LoginPage.css';
import LogoBranca from '../img/organize-branco.png';

const LoginPage = () => {
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
                    <text style={{color: '#D9D9D9'}}>Informe seu Login</text>
                    <input className='login' type='email' placeholder='Digite seu Email'/>
                    <input className='login' type='password' placeholder='Digite sua Senha'/>   
                    <button className='esqueceusenha' type='button'>Esqueceu sua senha?</button>                 
                </div>
                <div className='container-btn'>
                    <button className='loginBT' type='button'>Entrar</button>
                    <button className='registerBT' type='button'>Registrar</button>
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
