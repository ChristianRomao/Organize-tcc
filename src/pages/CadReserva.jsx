import React, { useCallback, useEffect, useState } from "react";
import "../css/Reserva.css";
import HeaderComponents from "../components/HeaderComponents";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from 'date-fns';


const CadReserva = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [inAllDay, setInAllDay] = useState(false);
  const [nmReserva, setNmReserva] = useState("");
  const [dsObservacao, setDsObservacao] = useState("");
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
  const [alerta, setAlerta] = useState("");
  const [success, setSuccess] = useState("");
  const [errorGrade, setErrorGrade] = useState("");

  const [selectDataInicio, setSelectDataInicio] = useState("");
  const [selectDataFim, setSelectDataFim] = useState("");
  const [selectHoraInicio, setSelectHoraInicio] = useState("");
  const [selectHoraFim, setSelectHoraFim] = useState("");
  const [dataFixa, setDataFixa] = useState("");
  const [horaMinuto, setHoraMinuto] = useState([]);
  const [hrMin, setHrMin] = useState("");

  const [showDetailSala, setShowDetailSala] = useState(false);
  const [showDetailCurso, setShowDetailCurso] = useState(false);
  const [showDetailUser, setShowDetailUser] = useState(false);

  const [page, setPage] = useState(1);

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

  const buscarUsuario = useCallback(async () => {
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
  }, [token]);

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
          setErrorGrade("");
        } else {
          console.error("Formato inexperado do respose de Curso", data);
          setCursos([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setErrorGrade(error.response.data.error);
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
          setErrorGrade("");
        } else {
          console.error("Formato inexperado do respose de Turma", data);
          setAnoTurmas([]);
        }
      } catch (error) {
        console.log(error.response.data);
        setErrorGrade(error.response.data.error);
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
        setErrorGrade(error.response.data.error);
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
      setShowDetailCurso(true);
      setShowDetailSala(true);
      setShowDetailUser(true);
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
    const hora = selectData.getHours();
    const minuto = selectData.getMinutes();
    const hrMin = `${hora <= 9 ? `0${hora}` : hora}:${minuto <= 9 ? `0${minuto}` : minuto}`;
    setHrMin(hrMin);
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
    setSuccess("");
    setAlerta("");
    setError("");
  };

  const handleSetPolo = (event) => {
    const polo = event.target.value;
    setSelectPolo(polo);
    setSelectSalaPolo("");
    buscarSalaPolo(polo);
    setSuccess("");
    setAlerta("");
    setError("");
  };

  const handleSetUsuario = (event) => {
    const usuario = event.target.value;
    setSelectUsuario(usuario);
    setSuccess("");
    setAlerta("");
    setError("");
  };

  const handleSetCurso = (event) => {
    const curso = event.target.value;
    console.log(curso);
    setSelectCurso(curso);
    setSelectAnoTurma("");
    setSelectGradeTurma("");
    setSuccess("");
    setAlerta("");
    setError("");
    if (curso) {
      buscarAnoTurma(curso);
    } else {
      setAnoTurmas([]);
      setErrorGrade("");
    }

    buscarGradeCursoAno(curso, "");
  };

  const handleSetGradeTurma = (event) => {
    const gradeTurma = event.target.value;
    setSelectGradeTurma(gradeTurma);
    setSuccess("");
    setAlerta("");
    setError("");
  };

  const handleSetAnoTurma = (event) => {
    const anoTurma = event.target.value;
    setSelectAnoTurma(anoTurma);
    setSuccess("");
    setAlerta("");
    setError("");

    let anoLetivo = "";
    if (anoTurma) {
      const turmaSelecionada = anoTurmas.find(
        (turma) => turma.id_turma === parseInt(anoTurma)
      );
      anoLetivo = turmaSelecionada ? turmaSelecionada.nr_anoletivo : "";
    }
    buscarGradeCursoAno(selectCurso, anoLetivo);
  };

  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    setSuccess("");
    setAlerta("");
    setError("");
    switch (name) {
      case "dt_inicio":
        setSelectDataInicio(value);
        if (selectDataFim < value) {
          setSelectDataFim(value);
        }
        break;
      case "dt_fim":
        setSelectDataFim(value);
        break;
      case "hr_inicio":
        setSelectHoraInicio(value);
        if (selectHoraFim < value) {
          setSelectHoraFim(value);
        }
        break;
      case "hr_fim":
        setSelectHoraFim(value);
        break;
      case "nm_reserva":
        setNmReserva(value);
        break;
      case "ds_observacao":
        setDsObservacao(value);
        break;
      default:
        break;
    }
  };

  const handleChangeCheckBox = (event) => {
    setSuccess("");
    setAlerta("");
    setError("");
    const inCheck = event.target.checked;
    if (inCheck) {
      setSelectHoraInicio("00:00");
      setSelectHoraFim("23:30");
      setInAllDay(true);
    } else {
      setSelectHoraInicio("");
      setSelectHoraFim("");
      setInAllDay(false);
    }
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
  };

  const handleCadastrarReserva = async () => {
    setAlerta("");

    let dataIniCompleta = "";
    let dataFimCompleta = "";

    if (selectHoraInicio && selectHoraFim) {
      dataIniCompleta = selectDataInicio + " " + selectHoraInicio + ":00";
      dataFimCompleta = selectDataFim + " " + selectHoraFim + ":00";
    }
    const payload = {
      nm_reserva: nmReserva,
      dt_inicio: dataIniCompleta,
      dt_fim: dataFimCompleta,
      ds_observacao: dsObservacao,
      sala: {
        id_sala: Number(selectSalaPolo),
      },
      usuario: {
        id_usuario: Number(selectUsuario),
      },
      grade: {
        id_grade: Number(selectGradeTurma),
      },
      status: {
        cd_status: "A",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/reserva",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNmReserva("");
      setSelectPolo("");
      setSelectGradeTurma("");
      setSelectUsuario("");
      setSelectCurso("");
      setSelectAnoTurma("");
      setSelectSalaPolo("");
      setSelectGradeTurma("");
      setDsObservacao("");
      setSelectHoraInicio("");
      setSelectHoraFim("");
      setSelectDataInicio(dataFixa);
      setSelectDataFim(dataFixa);
      setInAllDay(false);
      setPage(1);
      buscarCurso();
      buscarSalaPolo("");
      buscarUsuario();
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(error.response.data);
      setSuccess("");
      setAlerta(error.response.data.alert);
    }
  };

  const validaCadastroReserva = () => {
    if (
      !selectDataInicio ||
      !selectDataFim ||
      !selectHoraInicio ||
      !selectHoraFim ||
      !nmReserva ||
      nmReserva.length === 0 ||
      !selectSalaPolo ||
      !selectUsuario ||
      !selectGradeTurma
    ) {
      setError("Campos obrigatórios devem ser preenchidos!");
    } else {
      handleCadastrarReserva();
      setError("");
    }
  };

  const handleChangePage = (valuePage) => {
    const currentPage = Number(page) + Number(valuePage);

    if (currentPage > 0 && currentPage <= 3) {
      setPage(currentPage);
    }
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
          <div className="body-content">
            <div className="cadastro-reserva">
              <div className="titulo-reserva-div">
                <text className="titulo-reserva">Faça a sua Reserva</text>
              </div>
              <form className="ajustes-reserva">
                <div className="inputs-reserva-data">
                  <label className="titulo-inputs-reserva-data">
                    Informe o dia e a hora:
                  </label>
                  <div className="input-individual">
                    <input
                      className={
                        error && !selectDataInicio
                          ? "date-reserva-error"
                          : "date-reserva"
                      }
                      name="dt_inicio"
                      type="date"
                      value={selectDataInicio}
                      min={dataFixa}
                      onChange={handleChangeSelect}
                      required
                    />
                    <input
                      className={
                        error && !selectDataFim
                          ? "date-reserva-error"
                          : "date-reserva"
                      }
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
                      disabled={inAllDay}
                      className={
                        error && !selectHoraInicio
                          ? "time-reserva-error"
                          : "time-reserva"
                      }
                      name="hr_inicio"
                      onChange={handleChangeSelect}
                      value={selectHoraInicio}
                      required
                    >
                      <option value="" hidden>
                        hh:mm
                      </option>
                      {horaMinuto.map((time, index) => (
                        <option key={index} value={time} disabled={hrMin > time && selectDataInicio === dataFixa}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <select
                      disabled={inAllDay}
                      className={
                        error && !selectHoraFim
                          ? "time-reserva-error"
                          : "time-reserva"
                      }
                      name="hr_fim"
                      onChange={handleChangeSelect}
                      value={selectHoraFim}
                      required
                    >
                      <option value="" hidden>
                        hh:mm
                      </option>
                      {horaMinuto.map((time, index) => (
                        <option
                          key={index}
                          value={time}
                          disabled={selectHoraInicio > time || (hrMin > time && selectDataFim === dataFixa)}
                        >
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="checkbox-reserva-data">
                    <input
                      type="checkbox"
                      name="in_allday"
                      className="checkbox-button"
                      checked={inAllDay}
                      onChange={handleChangeCheckBox}
                    ></input>
                    Selecionar o dia todo?
                  </label>
                </div>
                <div className="divider"></div>
                <div className="inputs-reserva">
                  <div className="select-individual">
                    <label
                      className={
                        error && !nmReserva
                          ? "titulo-selects-reserva-error"
                          : "titulo-selects-reserva"
                      }
                    >
                      Nome da Reserva:
                    </label>
                    <input
                      type="text"
                      className="selects-reserva"
                      placeholder="Nome da reserva"
                      name="nm_reserva"
                      onChange={handleChangeSelect}
                      value={nmReserva}
                    />
                  </div>
                  <div className="select-individual">
                    <label className="titulo-selects-reserva">
                      Polo:
                    </label>
                    <select
                      className="selects-reserva"
                      id=""
                      name="id_polo"
                      value={selectPolo}
                      onChange={handleSetPolo}
                    >
                      <option value="" hidden>
                        Selecione um polo
                      </option>
                      {polos.map((polo) => (
                        <option key={polo.id_polo} value={polo.id_polo}>
                          {polo.nm_polo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-individual">
                    <label
                      className={
                        error && !selectSalaPolo
                          ? "titulo-selects-reserva-error"
                          : "titulo-selects-reserva"
                      }
                    >
                      Sala:
                    </label>
                    <select
                      className="selects-reserva"
                      id=""
                      name="id_sala"
                      value={selectSalaPolo}
                      onChange={handleSetSalaPolo}
                    >
                      <option value="" hidden>
                        Selecione uma sala
                      </option>
                      {salaPolos.map((salaPolo) => (
                        <option key={salaPolo.id_sala} value={salaPolo.id_sala}>
                          {salaPolo.nm_sala} - {salaPolo.bloco.nm_bloco} -{" "}
                          {salaPolo.bloco.polo.nm_polo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-individual">
                    <label
                      className={
                        error && !selectUsuario
                          ? "titulo-selects-reserva-error"
                          : "titulo-selects-reserva"
                      }
                    >
                      Responsável:
                    </label>
                    <select
                      className="selects-reserva"
                      id=""
                      name="Responsavel"
                      value={selectUsuario}
                      onChange={handleSetUsuario}
                    >
                      <option value="" hidden>
                        Selecione o responsável
                      </option>
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
                      Curso:
                    </label>
                    <select
                      className="selects-reserva"
                      id=""
                      name="id_curso"
                      value={selectCurso}
                      onChange={handleSetCurso}
                    >
                      <option value="" hidden>
                        Selecione o curso
                      </option>
                      {cursos.map((curso) => (
                        <option key={curso.id_curso} value={curso.id_curso}>
                          {curso.ds_curso}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-individual">
                    <label className="titulo-selects-reserva">
                      Ano Letivo:
                    </label>
                    <select
                      disabled={
                        !selectCurso || (!!errorGrade && !selectAnoTurma)
                      }
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
                        <option
                          key={anoTurma.id_turma}
                          value={anoTurma.id_turma}
                        >
                          {anoTurma.nr_anoletivo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-individual">
                    <label
                      className={
                        error && !selectGradeTurma
                          ? "titulo-selects-reserva-error"
                          : "titulo-selects-reserva"
                      }
                    >
                      Grade/Turma:
                    </label>
                    <select
                      disabled={!!errorGrade}
                      className="selects-reserva"
                      id=""
                      name="Grade"
                      value={selectGradeTurma}
                      onChange={handleSetGradeTurma}
                    >
                      <option value="" hidden>
                        Selecione a grade
                      </option>
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
                  <div className="select-individual">
                    <label className="titulo-selects-reserva">
                      Observação:
                    </label>
                    <input
                      type="text"
                      className="selects-reserva"
                      name="ds_observacao"
                      placeholder="Observação para a reserva"
                      onChange={handleChangeSelect}
                      value={dsObservacao}
                    />
                  </div>
                </div>
                <text
                  className={
                    success
                      ? "message-success"
                      : alerta
                      ? "message-alert"
                      : error
                      ? "message-error"
                      : ""
                  }
                >
                  {"" || alerta || error || success}
                </text>
                <button
                  disabled={!!errorGrade || !!error}
                  className={errorGrade ? "error-reserva" : "botao-reserva"}
                  type="button"
                  onClick={validaCadastroReserva}
                >
                  {errorGrade ? errorGrade : "Fazer Reserva"}
                </button>
              </form>
            </div>
            <div className="descricao-reserva">
              <div className="header-reserva">
                <button
                  onClick={() => handleChangePage(-1)}
                  className={
                    page === 1
                      ? "button-visibility-hidden"
                      : "button-header-descricao-reserva"
                  }
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ marginRight: "10px" }}
                  />{page === 2 ? "Salas" : page === 3 ? "Cursos" : "Default"}
                </button>
                <div className="box-text-descricao-header">
                  <text className="titulo-descricao-reserva">Detalhes</text>
                  <h4 className="titulo-descricao-reserva-item">
                    {page === 1
                      ? "SALAS"
                      : page === 2
                      ? "CURSOS"
                      : page === 3
                      ? "USUÁRIOS"
                      : ""}
                  </h4>
                </div>
                <button
                  onClick={() => handleChangePage(1)}
                  className={
                    page === 3
                      ? "button-visibility-hidden"
                      : "button-header-descricao-reserva"
                  }
                >
                  {page === 2 ? "Usuários" : page === 1 ? "Cursos" : "Default"}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ marginLeft: "10px" }}
                  />
                </button>
              </div>
              <div className="content-descricao-reserva">
                {showDetailSala && page === 1 ? (
                  salaPolos.map((salaPolo) => (
                    <ul
                      key={salaPolo.id_sala}
                      className="material-item-reserva"
                    >
                      <li style={{marginBlock:"-10px"}}><h3>{salaPolo.nm_sala}</h3></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Bloco: {salaPolo.bloco.nm_bloco}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Polo: {salaPolo.bloco.polo.nm_polo}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Capacidade Permitida: {salaPolo.qt_capacvigilancia}</p></li>
                    </ul>
                  ))
                ) : (
                  <></>
                )}
                {showDetailCurso && page === 2 ? (
                  gradeTurmas.map((gradeTurma) => (
                    <ul
                      key={gradeTurma.id_grade}
                      className="material-item-reserva"
                    >
                      <li style={{marginBlock:"-10px"}}><h3>{gradeTurma.turma.curso.ds_curso}</h3></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Qt. Alunos: {gradeTurma.qt_alunos}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Disciplina: {gradeTurma.disciplina.nm_disciplina}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Turma: {gradeTurma.turma.ds_turma}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Ano Letivo: {gradeTurma.turma.nr_anoletivo}</p></li>
                    </ul>
                  ))
                ) : (
                  <></>
                )}
                {showDetailUser && page === 3 ? (
                  usuarios.map((usuario) => (
                    <ul
                      key={usuario.id_usuario}
                      className="material-item-reserva"
                    >
                      <li style={{marginBlock:"-10px"}}><h3>{usuario.nm_usuario}</h3></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Dt. Nascimento: {format(usuario.dt_nascimento, 'dd/MM/yyyy')}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>E-mail: {usuario.ds_email}</p></li>
                      <li style={{listStyleType:"circle", marginBlock:"-10px"}}><p>Função: {usuario.ds_funcao === 'admin' ? "Administrador" : "Usuário"}</p></li>
                    </ul>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default CadReserva;
