import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import './App.css';
import TasksPage from "./Pages/TasksPage/TasksPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage/UnauthorizedPage";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="unauthorizedPage" element={<UnauthorizedPage />} />
        <Route path="/" element={<PrivateRoutes />}>
        <Route path="/tasksPage" element={<TasksPage />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;