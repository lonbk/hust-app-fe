/* Libs */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
/*Components */
import Loading from './components/Loading';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import QuestionsList from "./pages/QuestionsList";
import QuestionCreate from "./pages/QuestionCreate";
import AnswersList from "./pages/AnswersList";
import Profile from "./pages/Profile";
/* Styles */
/* Hooks */
import { useAuth0 } from "@auth0/auth0-react";
// import { useAppSelector, useAppDispatch } from "./app/hooks";
/* Configs */
// import { routes, useRecursiveRoutes } from "./config/routeConfig";
/* Types */

const App: React.FC = () => {
  // const configuredRoutes = useRecursiveRoutes(routes);
  const { isLoading } = useAuth0();

  if(isLoading) return (
    <Loading />
  )

  return (
    <Routes>
      {/* {configuredRoutes} */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isPrivate={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="/questions-list" element={<QuestionsList />} />
        <Route path="/questions-create" element={<QuestionCreate />} />
        <Route path="/answers-list" element={<AnswersList />} />
        <Route path="/profile" element={<Profile />} /> 
      </Route>
      <Route path="/verify" element={<Verify />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;