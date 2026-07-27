import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import MyTask from "./pages/MyTask";
import Completed from "./pages/Completed";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>

<Route path="/" element={<Navigate to="/login" />} />

<Route path="/login" element={<Login />} />
<Route 
  path="/register" 
  element={<Register />} 
/>


<Route element={<MainLayout />}>

  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/tasks" element={<Tasks />} />
  <Route path="/calendar" element={<Calendar />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/add-task" element={<AddTask />} />
  <Route path="/edit-task" element={<EditTask />} />
  <Route path="/my-tasks" element={<MyTask />} />
  <Route path="/completed" element={<Completed />} />

</Route>

</Routes>
  );
}

export default App;