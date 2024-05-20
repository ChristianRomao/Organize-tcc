import { useState } from "react";
import LayoutCad from "../components/LayoutCad";
import '../css/CadBlocos.css'
import {  faCube } from "@fortawesome/free-solid-svg-icons";

const CadBlocos = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [selectedOption, setSelectedOption] = useState('');
    const [nm_bloco, setNm_bloco] = useState('');
    const [polos, setPolos] = useState([]);

    const buscarPolo = useCallback(async () => {
        try {
          const response = await axios.get("http://localhost:8080/consulta-polo", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data.instituicoes;
          if (Array.isArray(data)) {
            setPolos(data);
          } else {
            console.error("Formato inexperado do respose de polo", data);
            setPolos([]);
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
        }
      }, [isAuthenticated, navigate, buscarInstituicao, buscarMunicipio]);

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