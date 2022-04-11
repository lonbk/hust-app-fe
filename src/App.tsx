/* Libs */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
/*Components */
import Loading from './components/Loading';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import QuestionsList from "./pages/QuestionsList";
import QuestionsCreate from "./pages/QuestionsCreate";
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
        <Route path="questions-list" element={<QuestionsList />} />
        <Route path="questions-create" element={<QuestionsCreate />} />
      </Route>
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
