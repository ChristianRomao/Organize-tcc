import React, { useCallback, useEffect, useState } from "react";
import "../css/Reserva.css";
import HeaderComponents from "../components/HeaderComponents";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadReserva = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [usuarios, setUsuarios] = useState([]);
  const [selectUsuario, setSelectUsuario] = useState("");
  const [polos, setPolos] = useState([]);
  const [selectPolo, setSelectPolo] = useState("");
  const [salaPolos, setSalaPolos] = useState([]);
  const [selectSalaPolo, setSelectSalaPolo] = useState("");
  const [cursos, setCursos] = useState([]);
  const [selectCurso, setSelectCurso] = useState("");
  const [gradeTurmas, setGradeTurmas] = useState([]);
  const [selectGradeTurma, setSelectGradeTurma] = useState("");
  const [anoTurmas, setAnoTurmas] = useState([]);
  const [selectAnoTurma, setSelectAnoTurma] = useState("");

  const [error, setError] = useState("");

  const [selectDataInicio, setSelectDataInicio] = useState("");
  const [selectDataFim, setSelectDataFim] = useState("");
  const [selectHoraInicio, setSelectHoraInicio] = useState("");
  const [selectHoraFim, setSelectHoraFim] = useState("");
  const [dataFixa, setDataFixa] = useState("");
  const [horaMinuto, setHoraMinuto] = useState([]);

  const buscarPolo = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-polo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.polos;
      if (Array.isArray(data)) {
        setPolos(data);
        setError("");
      } else {
        console.error("Formato inexperado do respose de polos", data);
        setPolos([]);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);
    }
  }, [token]);

  const buscarSalaPolo = useCallback(
    async (id) => {
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
          setError("");
        } else {
          console.error("Formato inexperado do respose de Sala", data);
          setSalaPolos([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.error);
      }
    },
    [token]
  );

  const buscarUsuario = useCallback(
    async (id) => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consulta-usuario",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.usuarios;
        if (Array.isArray(data)) {
          setUsuarios(data);
          setError("");
        } else {
          console.error("Formato inexperado do respose de Usuario", data);
          setUsuarios([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.error);
      }
    },
    [token]
  );

  const buscarCurso = useCallback(
    async (id) => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consulta-curso",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.cursos;
        if (Array.isArray(data)) {
          setCursos(data);
          setError("");
        } else {
          console.error("Formato inexperado do respose de Curso", data);
          setCursos([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.error);
      }
    },
    [token]
  );

  const buscarAnoTurma = useCallback(
    async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/consulta-turma-curso/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.turmas;
        if (Array.isArray(data)) {
          setAnoTurmas(data);
          setError("");
        } else {
          console.error("Formato inexperado do respose de Turma", data);
          setAnoTurmas([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.error);
      }
    },
    [token]
  );

  const buscarGradeCursoAno = useCallback(
    async (cursoId, anoLetivo) => {
      try {
        let url = "http://localhost:8080/consulta-grade";

        if (cursoId) {
          url += `/curso/${cursoId}`;
        } else {
          url += `/curso`;
        }

        if (anoLetivo) {
          url += `/ano/${anoLetivo}`;
        } else {
          url += `/ano`;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.grades;
        if (Array.isArray(data)) {
          setGradeTurmas(data);
          setError("");
        } else {
          console.error("Formato inexperado do respose de Turma", data);
          setGradeTurmas([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.error);
        setGradeTurmas([]);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarPolo();
      buscarSalaPolo("");
      buscarUsuario();
      buscarCurso();
      buscarGradeCursoAno("", "");
    }
  }, [
    isAuthenticated,
    navigate,
    buscarPolo,
    buscarSalaPolo,
    buscarUsuario,
    buscarCurso,
    buscarGradeCursoAno,
  ]);

  useEffect(() => {
    let selectData = new Date();
    selectData = selectData.toISOString().split("T")[0];
    setDataFixa(selectData);
    setSelectDataInicio(selectData);
    setSelectDataFim(selectData);

    const horaMinuto = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hora = i.toString().padStart(2, "0");
        const minuto = j.toString().padStart(2, "0");
        const time = `${hora}:${minuto}`;
        horaMinuto.push(time);
      }
    }
    setHoraMinuto(horaMinuto);
  }, []);

  const handleSetSalaPolo = (event) => {
    const salaPolo = event.target.value;
    setSelectSalaPolo(salaPolo);
  };

  const handleSetPolo = (event) => {
    const polo = event.target.value;
    setSelectPolo(polo);
    buscarSalaPolo(polo);
  };

  const handleSetUsuario = (event) => {
    const usuario = event.target.value;
    setSelectUsuario(usuario);
  };

  const handleSetCurso = (event) => {
    const curso = event.target.value;
    console.log(curso);
    setSelectCurso(curso);
    setSelectAnoTurma("");
    setSelectGradeTurma("");
    if (curso) {
      buscarAnoTurma(curso);
    } else {
      setAnoTurmas([]);
    }

    buscarGradeCursoAno(curso, "");
  };

  const handleSetGradeTurma = (event) => {
    const gradeTurma = event.target.value;
    setSelectGradeTurma(gradeTurma);
  };

  const handleSetAnoTurma = (event) => {
    const anoTurma = event.target.value;
    setSelectAnoTurma(anoTurma);

    let anoLetivo = "";
    if (anoTurma) {
      const turmaSelecionada = anoTurmas.find(
        (turma) => turma.id_turma === parseInt(anoTurma)
      );
      anoLetivo = turmaSelecionada ? turmaSelecionada.nr_anoletivo : "";
    }
    buscarGradeCursoAno(selectCurso, anoLetivo);
  };


  const handleChangeSelect = (event) =>{
    const {name,value} = event.target;
    switch(name){
      case "dt_inicio":
        setSelectDataInicio(value);
        if(selectDataFim < value){
          setSelectDataFim(value);
        }
        break;
      case "dt_fim":
        setSelectDataFim(value);
        break;
      case "hr_inicio":
        setSelectHoraInicio(value);
        if(selectHoraFim < value){
          setSelectHoraFim(value);
        }
        break;
      case "hr_fim":
        setSelectHoraFim(value);
        break;
      default:
        break;
    };
  };

  const getDistinctAnoTurmas = (turmas) => {
    if (!turmas) return [];
    const distinctAnos = [];
    const setAnos = new Set();

    turmas.forEach((turma) => {
      if (!setAnos.has(turma.nr_anoletivo)) {
        setAnos.add(turma.nr_anoletivo);
        distinctAnos.push(turma);
      }
    });

    return distinctAnos;
  }

  const handleCadastrarReserva = async () => {
    // event.preventDefault();
    // const payload = {
    //   nm_sala: nm_sala,
    //   qt_capacvigilancia: Number(qt_capacvigilancia),
    //   bloco: {
    //     id_bloco: Number(selectBloco),
    //   }
    // };
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/sala",
    //     payload,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error.response.data);
    // }

  };

  return (
    <div className="tudo">
      <HeaderComponents />
      <body className="reserva-home">
        <div className="reserva-body">
          <div>
            <button className="voltaHome">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate(-1)}
              >
                Voltar
              </p>
            </button>
            <button className="vaiConsulta">
              <p
                style={{ color: "#d6e7ff", margin: "0em 1em" }}
                onClick={() => navigate("/consulta-reserva")}
              >
                Ir para Consulta
              </p>
            </button>
          </div>
          <div>
            <text className="titulo-reserva">Faça a sua Reserva</text>
          </div>
          <div className="cadastro-reserva">
            <form className="ajustes-reserva">
              <label className="titulo-inputs-reserva">
                Informe o dia e a hora:
              </label>
              <div className="inputs-reserva">
                <div className="input-individual">
                  <input
                    className="date-reserva"
                    name="dt_inicio"
                    type="date"
                    value={selectDataInicio}
                    min={dataFixa}
                    onChange={handleChangeSelect}
                    required
                  />
                  <input
                    className="date-reserva"
                    name="dt_fim"
                    type="date"
                    value={selectDataFim}
                    min={selectDataInicio}
                    onChange={handleChangeSelect}
                    required
                  />
                </div>
                <div className="input-individual">
                  <select 
                    className="time-reserva"
                    name="hr_inicio"
                    onChange={handleChangeSelect}
                    value={selectHoraInicio}
                    required>
                    <option value="">hh:mm</option>
                    {horaMinuto.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select 
                    className="time-reserva"
                    name="hr_fim"
                    onChange={handleChangeSelect}
                    value={selectHoraFim}
                    required>
                    <option value="">hh:mm</option>
                    {horaMinuto.map((time, index) => (
                      <option key={index} value={time} disabled={selectHoraInicio > time}>
                        {time}
                      </option>
                    ))}
                  </select>
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
                      <option key={polo.id_polo} value={polo.id_polo}>
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
                      <option key={salaPolo.id_sala} value={salaPolo.id_sala}>
                        {salaPolo.nm_sala} - {salaPolo.bloco.nm_bloco} -{" "}
                        {salaPolo.bloco.polo.nm_polo}
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
                    value={selectUsuario}
                    onChange={handleSetUsuario}
                  >
                    <option value="">Selecione o responsável</option>
                    {usuarios.map((usuario) => (
                      <option
                        key={usuario.id_usuario}
                        value={usuario.id_usuario}
                      >
                        {usuario.nm_usuario}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Selecione o Curso:
                  </label>
                  <select
                    className="selects-reserva"
                    id=""
                    name="id_curso"
                    value={selectCurso}
                    onChange={handleSetCurso}
                  >
                    <option value="">Selecione o curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id_curso} value={curso.id_curso}>
                        {curso.ds_curso}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Selecione o Ano Letivo:
                  </label>
                  <select
                    disabled={!selectCurso || (!!error && !selectAnoTurma)}
                    className="selects-reserva"
                    id=""
                    name="id_curso"
                    value={selectAnoTurma}
                    onChange={handleSetAnoTurma}
                  >
                    <option value="">
                      {!selectCurso
                        ? "Selecione o curso"
                        : "Selecione o ano letivo"}
                    </option>
                    {getDistinctAnoTurmas(anoTurmas).map((anoTurma) => (
                      <option key={anoTurma.id_turma} value={anoTurma.id_turma}>
                        {anoTurma.nr_anoletivo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-individual">
                  <label className="titulo-selects-reserva">
                    Selecione a Grade:
                  </label>
                  <select
                    disabled={!!error}
                    className="selects-reserva"
                    id=""
                    name="Grade"
                    value={selectGradeTurma}
                    onChange={handleSetGradeTurma}
                  >
                    <option value="">Selecione a grade</option>
                    {gradeTurmas.map((gradeTurma) => (
                      <option
                        key={gradeTurma.id_grade}
                        value={gradeTurma.id_grade}
                      >
                        {gradeTurma.turma.ds_turma} -{" "}
                        {gradeTurma.turma.curso.ds_curso} -{" "}
                        {gradeTurma.turma.nr_anoletivo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                disabled={!!error}
                className={error ? "error-reserva" : "botao-reserva"}
                type="submit"
                onClick={handleCadastrarReserva}
              >
                {error ? error : "Fazer Reserva"}
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
