import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";
import TransactionAnalyticsPage from "./pages/TransactionAnalyticsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
function App() {
  return (
    <Routes>
      {/* ================================================= */}
      {/* DEFAULT ROUTE */}
      {/* ================================================= */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* ================================================= */}
      {/* LOGIN */}
      {/* ================================================= */}
      <Route path="/login" element={<LoginPage />} />
      {/* ================================================= */}
      {/* EMPLOYEE */}
      {/* ================================================= */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="EMPLOYEE">
            <EmployeePage />
          </ProtectedRoute>
        }
      />
      {/* ================================================= */}
      {/* MANAGER DASHBOARD */}
      {/* ================================================= */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="MANAGER">
            <ManagerPage />
          </ProtectedRoute>
        }
      />
      {/* ================================================= */}
      {/* MANAGER TRANSACTION ANALYTICS */}
      {/* ================================================= */}
      <Route
        path="/manager/analytics"
        element={
          <ProtectedRoute allowedRole="MANAGER">
            <TransactionAnalyticsPage />
          </ProtectedRoute>
        }
      />
      {/* ================================================= */}
      {/* UNKNOWN ROUTE */}
      {/* ================================================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
export default App;