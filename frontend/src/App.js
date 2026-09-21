import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";
function App() {
    return (
        <Routes>
            <Route
                path="/employee"
                element={<EmployeePage />}
            />
            <Route
                path="/manager"
                element={<ManagerPage />}
            />
            <Route
                path="*"
                element={
                    <Navigate
                        to="/employee"
                        replace
                    />
                }
            />
        </Routes>
    );
}
export default App;