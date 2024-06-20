import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faFloppyDisk, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeaderComponents from '../components/HeaderComponents';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import CadMaterialSala from './CadMaterialSala';
import LoadingIcon from '../components/LoadingIcon';
import '../css/HomePage.css';
import { jwtDecode } from "jwt-decode";



const HomePage = () => {
    const token = localStorage.getItem("token");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }else{
            const decode = jwtDecode(token);

            if(decode.ds_funcao === 'admin'){
              setIsAdmin(true);
            }else{
              setIsAdmin(false);
            }
        }
    }, [isAuthenticated, navigate, token]);

    const handleNavigation = async (route) => {
        setIsLoading(true);
        try {
            
            await new Promise(resolve => setTimeout(resolve, 500));
            navigate(route);
        } catch (error) {
            console.error('Erro ao navegar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCadastro = (cadastros) => {
        if(cadastros === "usuarios"){
            handleNavigation(`/registro`);
        }else{
            handleNavigation(`/cadastro-${cadastros}`);
        }
    };

    const handleConsulta = (consulta) => {
        handleNavigation(`/consulta-${consulta}`);
    };

    const handleReserva = (acao) => {
        handleNavigation(`/${acao}-reserva`);
    };

    return (
        <div>
            <HeaderComponents />
            <body className='body-home'>
                <div className='grid-principal'>
                {isAdmin ?(
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#ffffff" }} size='3x' />
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
                    </div>)
                    :
                    (<></>)
                    }
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='3x' />
                            <p className='titulos-home'>Consulta</p>
                            <div className='btn-gerais scrollable'>
                                {/* <button className='btn' type="button" onClick={() => handleConsulta('instituicao')}>Instituição</button> */}
                                <button className='btn' type="button" onClick={() => handleConsulta('bloco')}>Bloco</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('material')}>Materiais</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('polo')}>Polo</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('sala')}>Sala</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('grade')}>Turmas</button>
                                <button className='btn' type="button" onClick={() => handleConsulta('usuario')}>Usuários</button>
                                {/* <button className='btn' type="button" onClick={() => handleConsulta('turma')}>Turma</button> */}

                            </div>
                        </div>
                    </div>
                    <div className='item-da-grid'>
                        <div className='interior'>
                            <FontAwesomeIcon icon={faCalendarDays} size='3x' />
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
            {isLoading && <LoadingIcon />}
        </div>
    );
};

export default HomePage;
