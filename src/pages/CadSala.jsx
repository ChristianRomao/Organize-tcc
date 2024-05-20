import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import { useState } from "react";
import '../css/CadSala.css';
import ModalComponent from "../components/ModalComponent";

const CadSala = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleChange = () => {
        
    };

    const handleSubmit = () => {

    }

    return (
        <Layout title='Cadastro de Sala' icon={faDoorOpen} next=''>
            <form className='ajustes-sala'>
                <div>
                    <label className='titulo-inputs-sala'>Bloco</label>
                    <select className='select-sala' id="" name="Bloco" value={selectedOption} onChange={handleSelectChange}>
                        <option value="Polo">Bloco B</option>
                    </select>
                </div>
                <div>
                    <label className='titulo-inputs-sala'>Nome da Sala</label>
                    <input
                        className='inputs-sala'
                        type="text"
                        name="Sala"
                        required
                    />
                </div>
                <div>
                    <label className='titulo-inputs-sala'>Capacidade Vigilância</label>
                    <input
                        className='inputs-sala'
                        type="text"
                        name="cd_cpfcnpj"
                        required
                    />
                </div>
                <div className="grid">
                    <button className='grava-sala' type="submit" onSubmit={handleSubmit}>Gravar Sala</button>
                    <button className='materiais-sala' type="submit" onClick={handleOpenModal}>Cadastro Materiais</button>
                </div>
            </form>
            <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} titleM='Materiais'>
                <form className='ajustes-sala'>
                    <div>
                        <label className="modal-titulo-sala">Sala</label>
                        <input className="modal-input-sala"  style={{backgroundColor: "#000b1a", color: "#fff", cursor: "not-allowed"}} type="text" name="Sala" readOnly/>
                    </div>
                    <div>
                        <label className="modal-titulo-sala">Material/Estoque</label>
                        <select className="modal-input-sala" name="Estoque" id="">
                            <option value="">NoteBook - 10 un.</option>
                        </select>
                    </div>
                    <div>
                        <label className="modal-titulo-sala">Quantidade</label>
                        <input className="modal-input-sala" type="number" name="Quantidade"/>
                    </div>
                    <button className='grava-materiais' type="submit" onSubmit={handleSubmit}>Adicionar Materiais</button>
                </form>
            </ModalComponent>
        </Layout>
    );
}

export default CadSala;