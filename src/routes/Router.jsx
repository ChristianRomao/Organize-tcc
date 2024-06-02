import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CadInstituicao from "../pages/CadInstituicao";
import CadPolos from "../pages/CadPolos";
import CadReserva from "../pages/CadReserva";
import CadBlocos from "../pages/CadBlocos";
import CadSala from "../pages/CadSala";
import ConsReserva from "../consulta/ConsReserva";
import CadMunicipio from "../pages/CadMunicipio";
import CadDisciplina from "../pages/CadDisciplina";
import CadCursoTurma from "../pages/CadCursoTurma";
import CadGrade from "../pages/CadGrade";
import ConsInstituicao from "../consulta/ConsInstituicao";
import CadMateriais from "../pages/CadMateriais";
import ConsPolo from "../consulta/ConsPolo";
import ConsBloco from "../consulta/ConsBloco";
import ConsSala from "../consulta/ConsSala";
import ConsMateriais from "../consulta/ConsMateriais";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<LoginPage/>}>    
                </Route>
                <Route
                    path={"/login"}
                    element={<LoginPage/>}>    
                </Route> 
                {/* CADASTRO */}
                <Route
                    path={"/registro"}
                    element={<RegisterPage/>}>    
                </Route>
                <Route
                    path={"/home"}
                    element={<HomePage/>}>    
                </Route>
                <Route
                    path={"/cadastro-municipio"}
                    element={<CadMunicipio/>}>    
                </Route>
                <Route
                    path={"/cadastro-instituicao"}
                    element={<CadInstituicao/>}>    
                </Route>
                <Route
                    path={"/cadastro-polo"}
                    element={<CadPolos/>}>    
                </Route>
                <Route
                    path={"/cadastro-bloco"}
                    element={<CadBlocos/>}>    
                </Route>
                <Route
                    path={"/cadastro-sala"}
                    element={<CadSala/>}>    
                </Route>
                <Route
                    path={"/cadastro-curso-turma"}
                    element={<CadCursoTurma/>}>    
                </Route>
                <Route
                    path={"/cadastro-disciplina"}
                    element={<CadDisciplina/>}>    
                </Route>
                <Route
                    path={"/cadastro-grade"}
                    element={<CadGrade/>}>    
                </Route>
                <Route
                    path={"/cadastro-reserva"}
                    element={<CadReserva/>}>    
                </Route>
                <Route
                    path={"/cadastro-materiais"}
                    element={<CadMateriais/>}>    
                </Route>
                {/* CONSULTA */}
                <Route
                    path={"/consulta-reserva"}
                    element={<ConsReserva/>}>    
                </Route>
                <Route
                    path={"/consulta-instituicao"}
                    element={<ConsInstituicao/>}>    
                </Route>
                <Route
                    path={"/consulta-polo"}
                    element={<ConsPolo/>}>    
                </Route>
                <Route
                    path={"/consulta-bloco"}
                    element={<ConsBloco/>}>    
                </Route>
                <Route
                    path={"/consulta-sala"}
                    element={<ConsSala/>}>    
                </Route>
                <Route
                    path={"/consulta-material"}
                    element={<ConsMateriais/>}>    
                </Route>
                <Route
                    path={"/consulta-polo"}
                    element={<ConsPolo/>}>    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;