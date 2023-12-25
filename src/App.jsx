import './App.css';
import CancelEventPage from './components/cancelEvenetPage';
import HomeSection from './components/homeSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeSection/>} index />
        <Route path="/events/cancelEvent/:id" element={<CancelEventPage/>} /> 
      </Routes>
    </Router>
  );
}
export default App;