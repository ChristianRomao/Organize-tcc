import '../css/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFloppyDisk, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';

const HomePage = () => {
    return (
        <div>
            <HeaderComponents/>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#ffffff",}} size='3x'/>
                            <p className='titulos-home'>Cadastro</p>
                            <div className='btn-gerais'>
                                <button className='btn' type="button">Instituição</button>
                                <button className='btn' type="button">Polo</button>
                                <button className='btn' type="button">Bloco</button>
                                <button className='btn' type="button">Sala</button>
                                <button className='btn' type="button">Materiais</button>
                                <button className='btn' type="button">Usuários</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>  
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x'/>
                            <p className='titulos-home'>Consulta</p>
                            <div className='btn-gerais'>
                                <button className='btn' type="button">Instituição</button>
                                <button className='btn' type="button">Polo</button>
                                <button className='btn' type="button">Bloco</button>
                                <button className='btn' type="button">Sala</button>
                                <button className='btn' type="button">Materiais</button>
                                <button className='btn' type="button">Usuários</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x'/>
                            <p className='titulos-home'>Reserva</p>
                            <div className='btn-gerais'>
                                <button className='btn' type="button">Cadastrar</button>
                                <button className='btn' type="button">Consultar</button>
                                <button className='btn' type="button">Relatório</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;