import { useState } from "react";
import LayoutCad from "../components/LayoutCad";
import '../css/CadBlocos.css'
import {  faCube } from "@fortawesome/free-solid-svg-icons";

const CadBlocos = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleChange = () => {
        
    };

    const handleSubmit = () => {

    }

    return (
        <LayoutCad title='Cadastro de Bloco' icon={faCube} next='sala'>
            <form className='ajustes-bloco'>
                <div>
                    <label className='titulo-inputs-bloco'>Polo</label>
                    <select className='select-bloco' id="" name="Polo" value={selectedOption} onChange={handleSelectChange}>
                        <option value="Polo">Integrado Centro</option>
                    </select>
                </div>
                <div>
                    <label className='titulo-inputs-bloco'>Nome do Bloco</label>
                    <div  className="grid">
                        <input
                            className='input-bloco'
                            type="text"
                            name="cd_cpfcnpj"
                            // value={colocar}
                            onChange={handleChange}
                            required
                        />
                        <button className='adiciona-polo' type="submit" onSubmit={handleSubmit}>Adicionar</button>
                    </div>
                </div>
                <button className='botao-bloco' type="submit" onSubmit={handleSubmit}>Gravar</button>
            </form>
        </LayoutCad>
    );
}

export default CadBlocos;