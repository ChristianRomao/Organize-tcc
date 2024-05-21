import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { useCallback, useEffect, useState } from "react";
import "../css/CadSala.css";
import ModalComponent from "../components/ModalComponent";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadSala = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [blocos, setBlocos] = useState([]);
  const [selectBloco, setSelectBloco] = useState("");
  const [nm_sala, setNm_sala] = useState("");
  const [qt_capacvigilancia, setQt_capacvigilancia] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const buscarBloco = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/consulta-bloco", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.blocos;
      if (Array.isArray(data)) {
        setBlocos(data);
      } else {
        console.error("Formato inexperado do respose de bloco", data);
        setBlocos([]);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      buscarBloco();
    }
  }, [isAuthenticated, navigate, buscarBloco]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSetBloco = (event) => {
    setSelectBloco(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nm_sala":
        setNm_sala(value);
        console.log(qt_capacvigilancia)
        break;
      case "qt_capacvigilancia":
        setQt_capacvigilancia(value);
        break;
      default:
        break;
    }
  };

  const handleCadastroSala = async () => {
    const payload = {
      nm_sala: nm_sala,
      qt_capacvigilancia: Number(qt_capacvigilancia),
      bloco: {
        id_bloco: Number(selectBloco),
      }
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/sala",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNm_sala('');
      setQt_capacvigilancia('');
      setSelectBloco('');
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = () => {}

  return (
    <Layout title="Cadastro de Sala" icon={faDoorOpen} next="">
      <form className="ajustes-sala">
        <div>
          <label className="titulo-inputs-sala">Bloco - Polo</label>
          <select
            className="select-sala"
            id=""
            name="id_bloco"
            value={selectBloco}
            onChange={handleSetBloco}
          >
            <option value="">Selecione um bloco</option>
            {blocos.map((bloco) => (
              <option key={bloco.id_bloco} value={bloco.id_bloco}>
                {bloco.nm_bloco} - {bloco.polo.nm_polo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="titulo-inputs-sala">Nome da Sala</label>
          <input
            className="inputs-sala"
            type="text"
            name="nm_sala"
            value={nm_sala}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="titulo-inputs-sala">Capacidade Vigilância</label>
          <input
            className="inputs-sala"
            type="text"
            name="qt_capacvigilancia"
            value={qt_capacvigilancia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid">
          <button
            className="grava-sala"
            type="button"
            onClick={handleCadastroSala}
          >
            Gravar Sala
          </button>
          <button
            className="materiais-sala"
            type="button"
            onClick={handleOpenModal}
          >
            Cadastro Materiais
          </button>
        </div>
      </form>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        titleM="Materiais"
      >
        <form className="ajustes-sala">
          <div>
            <label className="modal-titulo-sala">Sala</label>
            <input
              className="modal-input-sala"
              value={nm_sala}
              style={{
                backgroundColor: "#000b1a",
                color: "#fff",
                cursor: "not-allowed",
              }}
              type="text"
              name="Sala"
              readOnly
            />
          </div>
          <div>
            <label className="modal-titulo-sala">Material/Estoque</label>
            <select className="modal-input-sala" name="Estoque" id="">
              <option value="">NoteBook - 10 un.</option>
            </select>
          </div>
          <div>
            <label className="modal-titulo-sala">Quantidade</label>
            <input
              className="modal-input-sala"
              type="number"
              name="Quantidade"
            />
          </div>
          <button
            className="grava-materiais"
            type="submit"
            onSubmit={handleSubmit}
          >
            Adicionar Materiais
          </button>
        </form>
      </ModalComponent>
    </Layout>
  );
};

export default CadSala;
