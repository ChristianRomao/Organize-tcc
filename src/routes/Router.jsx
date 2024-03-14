import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage/>}>    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;