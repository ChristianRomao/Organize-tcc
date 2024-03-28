import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";

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
            </Routes>
        </BrowserRouter>
    );
}

export default Router;