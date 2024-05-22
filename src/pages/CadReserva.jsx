import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/Reserva.css";
import HeaderComponents from "../components/HeaderComponents";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadReserva = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [salaPolos, setSalaPolos] = useState([]);
  const [selectPolo, setSelectPolo] = useState("");
  const [polos, setPolos] = useState([]);
  const [selectSalaPolo, setSelectSalaPolo] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const buscarPolo = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/consulta-polo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.polos;
      if (Array.isArray(data)) {
        setPolos(data);
      } else {
        console.error("Formato inexperado do respose de polos", data);
        setPolos([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  const buscarSalaPolo = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/consulta-sala/polo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.salas;
      if (Array.isArray(data)) {
        setSalaPolos(data);
      } else {
        console.error("Formato inexperado do respose de Sala", data);
        setSalaPolos([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarPolo();
      buscarSalaPolo('');
    }
  }, [isAuthenticated, navigate, buscarPolo, buscarSalaPolo]);

  const handleSetSalaPolo = (event) => {
    const salaPolo = event.target.value;
    setSelectSalaPolo(salaPolo);
  };

  const handleSetPolo = (event) => {
    const polo = event.target.value
    setSelectPolo(polo);
    buscarSalaPolo(polo);
  }

  const handleCadastrarReserva = () => {};

  return (
    <div className='tudo'>
      <HeaderComponents/>
      <body className='reserva-home'>
        <div className='reserva-body'>
          <div>
            <button className='voltaHome'>
              <p style={{color: "#d6e7ff", margin: "0em 1em"}} onClick={()=>navigate(-1)}>Voltar</p>
            </button>
            <button className='vaiConsulta'>
              <p style={{color: "#d6e7ff", margin: "0em 1em"}} onClick={()=>navigate('/consulta-reserva')}>Ir para Consulta</p>
            </button>
          </div>
          <div>
            <text className='titulo-reserva'>Faça a sua Reserva</text>
          </div> 
          <div className='cadastro-reserva'>
            <form className='ajustes-reserva'>
              <label className='titulo-inputs-reserva'>Insira o dia e a hora:</label>
              <div className='inputs-reserva'>
                <div className='input-individual'>
                  <input className='date-reserva' type="date" required/>
                  <input className='date-reserva' type="date" required/> 
                </div>
                <div className="input-individual">
                  <input className="time-reserva" type="time" required />
                  <input className="time-reserva" type="time" required />
                </div>
              </div>
              <div className="inputs-reserva">
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Escolha o Polo:
                  </label>
                  <select
                    className="selects-reserva"
                    id=""
                    name="id_polo"
                    value={selectPolo}
                    onChange={handleSetPolo}
                  >
                  <option value="">Selecione um polo</option>
                  {polos.map((polo) => (
                    <option
                      key={polo.id_polo}
                      value={polo.id_polo}
                    >
                      {polo.nm_polo}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Escolha a Sala:
                  </label>
                  <select
                    className="selects-reserva"
                    id=""
                    name="id_sala"
                    value={selectSalaPolo}
                    onChange={handleSetSalaPolo}
                  >
                    <option value="">Selecione uma sala</option>
                  {salaPolos.map((salaPolo) => (
                    <option
                      key={salaPolo.id_sala}
                      value={salaPolo.id_sala}
                    >
                      {salaPolo.nm_sala} - {salaPolo.bloco.nm_bloco} - {salaPolo.bloco.polo.nm_polo} 
                    </option>
                  ))}
                  </select>
                </div>
              </div>
              <div className="inputs-reserva">
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Responsavel pela Sala:
                  </label>
                  <select
                    className="selects-reserva"
                    id=""
                    name="Responsavel"
                    value={selectedOption}
                    onChange={selectedOption}
                  >
                    <option value="">Selecione o responsável</option>
                  </select>
                </div>
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Selecione a Grade:
                  </label>
                  <select
                    className="selects-reserva"
                    id=""
                    name="Grade"
                    value={selectedOption}
                    onChange={selectedOption}
                  >
                    <option value="Polo 1">Não sei</option>
                  </select>
                </div>
              </div>
              <button
                className="botao-reserva"
                type="submit"
                onSubmit={handleCadastrarReserva}
              >
                Fazer Reserva
              </button>
            </form>
          </div>
          <div className="descricao-reserva">
            <text className="titulo-descricao">Detalhes da Reserva</text>
            <div>
              {/* aqui da bom coloca as infos, mas ai só ajustar o css e boa. */}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default CadReserva;
