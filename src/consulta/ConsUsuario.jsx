import LayoutConsulta from "../components/LayoutConsulta";

const ConsUsuario = () => {
    return (
        <LayoutConsulta titleCons='Consulta Usuários'>
            <div className="consulta-grade">
                <h4>Disciplina:</h4>
                <p>Java</p>
            </div>
            <div className="consulta-grade">
                <h4>Turma:</h4>
                <p>4º Periodo</p>
            </div>
            <div className="consulta-grade">
                <h4>Ano Letivo:</h4>
                <p>2023</p>
            </div>
        </LayoutConsulta>
    );
}

export default ConsUsuario;