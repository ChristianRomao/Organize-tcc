import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CadInstituicao from "../pages/CadInstituicao";
import CadPolos from "../pages/CadPolos";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/login"}
                    element={<LoginPage/>}>    
                </Route>
                <Route
                    path={"/registro"}
                    element={<RegisterPage/>}>    
                </Route>
                <Route
                    path={"/home"}
                    element={<HomePage/>}>    
                </Route>
                <Route
                    path={"/cadastro-instituição"}
                    element={<CadInstituicao/>}>    
                </Route>
                <Route
                    path={"/cadastro-polo"}
                    element={<CadPolos/>}>    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;