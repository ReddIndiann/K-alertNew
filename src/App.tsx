import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {ForgotPassword, OtpEntry, ResetPassword } from "./Auth";
import { Login } from './Auth/Login';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">

        <Toaster />
        <Routes>
      <Route path="/" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
