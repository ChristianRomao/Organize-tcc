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
    async () => {
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

  const handleChangeCheckBox = (event) =>{
    setSuccess("");
    setAlerta("");
    setError("");
    const inCheck = event.target.checked;
    if(inCheck){
      setSelectHoraInicio('00:00');
      setSelectHoraFim('23:30');
      setInAllDay(true)
    }else{
      setSelectHoraInicio('');
      setSelectHoraFim('');
      setInAllDay(false);
    }
  }

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
    console.log(selectHoraInicio+'     '+selectHoraFim);
    if(!selectDataInicio || !selectDataFim || !selectHoraInicio || !selectHoraFim || !nmReserva || !selectSalaPolo || !selectUsuario || !selectGradeTurma){
      setError("Campos obrigatórios devem ser preenchidos!")
    }else{
      setError("")
    }
    
    let dataIniCompleta = ''
    let dataFimCompleta = ''

    if(selectHoraInicio && selectHoraFim){
      dataIniCompleta = selectDataInicio+' '+selectHoraInicio+':00';
      dataFimCompleta = selectDataFim+' '+selectHoraFim+':00';
    }
    const payload = {
      nm_reserva : nmReserva,
      dt_inicio: dataIniCompleta,
      dt_fim: dataFimCompleta,
      ds_observacao: dsObservacao,
      sala:{
        id_sala: Number(selectSalaPolo)
      },
      usuario:{
        id_usuario: Number(selectUsuario)
      },
      grade:{
        id_grade: Number(selectGradeTurma)
      },
      status:{
        cd_status: 'A'
      }
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
      setNmReserva('');
      setSelectPolo('');
      setSelectGradeTurma('');
      setSelectUsuario('');
      setSelectCurso('');
      setSelectAnoTurma('');
      setSelectSalaPolo('');
      setSelectGradeTurma('');
      setDsObservacao('');
      setSelectHoraInicio('');
      setSelectHoraFim('');
      setSelectDataInicio(dataFixa);
      setSelectDataFim(dataFixa);
      setInAllDay(false);
      setSuccess(response.data.message)
    } catch (error) {
      console.log(error.response.data);
      setSuccess("");
      setAlerta(error.response.data.alert);
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
                      className={error && !selectDataInicio ?"date-reserva-error":"date-reserva"}
                      name="dt_inicio"
                      type="date"
                      value={selectDataInicio}
                      min={dataFixa}
                      onChange={handleChangeSelect}
                      required
                    />
                    <input
                      className={error && !selectDataFim ?"date-reserva-error":"date-reserva"}
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
                      className={error && !selectHoraInicio ?"time-reserva-error":"time-reserva"}
                      name="hr_inicio"
                      onChange={handleChangeSelect}
                      value={selectHoraInicio}
                      required
                    >
                      <option value="">hh:mm</option>
                      {horaMinuto.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <select
                      disabled={inAllDay}
                      className={error && !selectHoraFim ?"time-reserva-error":"time-reserva"}
                      name="hr_fim"
                      onChange={handleChangeSelect}
                      value={selectHoraFim}
                      required
                    >
                      <option value="">hh:mm</option>
                      {horaMinuto.map((time, index) => (
                        <option
                          key={index}
                          value={time}
                          disabled={selectHoraInicio > time}
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
                    <label className={error && !nmReserva ?"titulo-selects-reserva-error":"titulo-selects-reserva"}>
                      Nome da reserva:
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
                  <label className={error && !selectSalaPolo ?"titulo-selects-reserva-error":"titulo-selects-reserva"}>
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
                  <div className="select-individual">
                  <label className={error && !selectUsuario ?"titulo-selects-reserva-error":"titulo-selects-reserva"}>
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
                      Selecione o Ano:
                    </label>
                    <select
                      disabled={!selectCurso || (!!errorGrade && !selectAnoTurma)}
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
                  <label className={error && !selectGradeTurma ?"titulo-selects-reserva-error":"titulo-selects-reserva"}>
                      Selecione a Grade/Turma:
                    </label>
                    <select
                      disabled={!!errorGrade}
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
                <text className={success ? "message-success" : alerta ? "message-alert" : error ? "message-error" : ""}>{"" || alerta || error || success}</text>
                <button
                  disabled={!!errorGrade || !!error}
                  className={errorGrade ? "error-reserva" : "botao-reserva"}
                  type="button"
                  onClick={handleCadastrarReserva}
                >
                  {errorGrade ? errorGrade : "Fazer Reserva"}
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
        </div>
      </body>
    </div>
  );
};

export default CadReserva;
