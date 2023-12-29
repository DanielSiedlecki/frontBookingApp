import './App.css';
import CancelEventPage from './components/cancelEventPage';
import LoginSection from './components/loginSection';
import HomeSection from './components/homeSection';
import RegisterSection from './components/registerSection';
import ForgotPassword from './components/forgotPasswordSection';
import ChangePassword from './components/changePasswordSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSection/>} index />
        <Route path="/events/cancelEvent/:id" element={<CancelEventPage />} /> 
        <Route path="/register" element={<RegisterSection />} /> 
        <Route path="/login" element={<LoginSection />} /> 
        <Route path="/forgotpassword" element={<ForgotPassword />} /> 
        <Route path="/changepassword" element={<ChangePassword />} /> 
      </Routes>
    </Router>
  );
}
export default App;