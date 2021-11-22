import { Routes, Route } from "react-router-dom";
import Cards from "./components/Cards";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/Admin/Dashboard";
import ClientDashboard from "./pages/Client/Dashboard";
import ClientHome from "./pages/Client/Home";
import SocketContext, { socketObj } from "./socket";
import MissionControl from "./pages/Admin/MissionControl";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <SocketContext.Provider value={socketObj}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="admin" element={<AuthPage />} />
          <Route
            path="admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="admin/dashboard/:sessionId"
            element={
              <RequireAuth>
                <MissionControl />
              </RequireAuth>
            }
          />
          <Route path="client" element={<AuthPage />} />
          <Route
            path="auth"
            element={
              <RequireAuth>
                <ClientHome />
              </RequireAuth>
            }
          />
          <Route
            path="client/dashboard"
            element={
              <RequireAuth>
                <ClientDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="client/dashboard/:sessionId"
            element={
              <RequireAuth>
                <Cards />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </SocketContext.Provider>
  );
};

export default App;
