/* Libs */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
/*Components */
import Loading from './components/Loading';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import Portal from "./pages/Portal";
/* Styles */
import './app.scss'

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if(isLoading) return (
    <Loading />
  )

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Portal />
          </ProtectedRoute>
        }
      />
      <Route path="/verify" element={<Verify />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
