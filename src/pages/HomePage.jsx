import '../css/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFloppyDisk, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useEffect, useState } from 'react';
import CadMaterialSala from './CadMaterialSala';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {isAuthenticated} = useAuth();

    const navigate = useNavigate()

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/login')
        }
    },[isAuthenticated, navigate])

    const handleCadastro = (cadastros) => {
        if(cadastros === 'usuarios'){
            navigate(`/registro`)
        }else{
            navigate(`/cadastro-${cadastros}`)
        }
    }

    const handleConsulta = (consulta) => {
        if(consulta === 'usuarios'){
            navigate(`/consulta`)
        }else{
            navigate(`/consulta-${consulta}`)
        }
    }

    const handleReserva = (acao) => {
        navigate(`/${acao}-reserva`)
    }
    return (
        <div>
            <HeaderComponents/>
            <body className='body-home'>
                <div className='grid-principal'>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faFloppyDisk} style={{color: "#ffffff",}} size='3x'/>
                            <p className='titulos-home'>Cadastro</p>
                            <div className='btn-gerais scrollable'>
                                <button className='btn' type="button" onClick={() => handleCadastro('municipio')}>Município</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('instituicao')}>Instituição</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('polo')}>Polo</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('bloco')}>Bloco</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('sala')}>Sala</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('materiais')}>Materiais</button>
                                <button className='btn' type="button" onClick={handleOpenModal}>Vincular Materiais</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('usuarios')}>Usuários</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('curso-turma')}>Curso/Turma</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('disciplina')}>Disciplina</button>
                                <button className='btn' type="button" onClick={() => handleCadastro('grade')}>Grade</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>  
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x'/>
                            <p className='titulos-home'>Consulta</p>
                            <div className='btn-gerais scrollable'>
                                <button className='btn' type="button" onClick={() => handleConsulta('instituicao')}>Instituição</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('polo')}>Polo</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('bloco')}>Bloco</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('sala')}>Sala</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('material')}>Materiais</button>
                                <button className='btn' type="button" onClick={() => handleConsulta()}>Usuários</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('turma')}>Turma</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('')}>Disciplina</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('')}>Grade</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x'/>
                            <p className='titulos-home'>Reserva</p>
                            <div className='btn-gerais'>
                                <button className='btn' type="button" onClick={() => handleReserva('cadastro')}>Cadastrar</button>
                                <button className='btn' type="button" onClick={() => handleReserva('consulta')}>Consultar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            {isModalOpen && (
                <CadMaterialSala onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default HomePage;