import LayoutConsulta from "../components/LayoutConsulta";

const ConsGrade = () => {
    return (
        <LayoutConsulta>
            <div className="informacoes-grade">
                <FontAwesomeIcon icon={faGraduationCap} size="3x" style={{color: "#001636"}}/>
                <div className="consulta-grade">
                    <h4>Curso:</h4>
                    <p>TADS</p>
                </div>
                <div className="consulta-grade">
                    <h4>Turma:</h4>
                    <p>1º Periodo</p>
                </div>
                <div className="consulta-grade">
                    <h4>Ano Letivo:</h4>
                    <p>2024</p>
                </div>
            </div>
        </LayoutConsulta>
    );
}

export default ConsGrade;