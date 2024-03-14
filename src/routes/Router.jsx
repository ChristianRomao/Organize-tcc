import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<LoginPage/>}>    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;