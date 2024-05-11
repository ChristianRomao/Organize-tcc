import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';

const HomePage = () => {
    return (
        <div>
            <HeaderComponents/>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faPenToSquare} size='3x'/>
                            <text>Cadastro</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>  
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x'/>
                            <text>Consulta</text>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x'/>
                            <text>Reserva</text>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default HomePage;