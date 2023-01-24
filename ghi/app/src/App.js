import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './technicianform';
import AppointmentForm from './appointmentform';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technician/" element={<TechnicianForm />} />
          <Route path="appointment/" element={<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
