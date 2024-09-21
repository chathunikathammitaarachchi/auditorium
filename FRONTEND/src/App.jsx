import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Admin/Home';
import Signup from './Components/Admin/Signup';
import Login from './Components/Admin/Login';
import ForgotPassword from './Components/Admin/ForgotPassword';
import ResetPassword from './Components/Admin/ResetPassword';
import Dashboard from './Components/Admin/Dashboard';




function App() {
  return (
    <div>
      <BrowserRouter>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;