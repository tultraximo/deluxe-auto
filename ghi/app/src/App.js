import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './technicianform';
import AppointmentForm from './appointmentform';
import AppointmentList from './appointmentlist';
import AppointmentHistory from './appointmenthistory';

function App() {
  // const [appointments, setAppointments] = useState()


  // const getAppointments = async () => {
  //   const url = "http://localhost:8080/api/appointments/"

  //   const response = await fetch(url);

  //   if (response.ok) {
  //       const data = await response.json();
  //       // console.log(data)
  //       setAppointments(data.appointments)
  //   }
  //   }

  //   useEffect(() => {
  //     getAppointments();
  //     }, []);


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technician/" element={<TechnicianForm />} />
          <Route path="appointment/" element={<AppointmentForm />} />
          <Route path="appointment/list/" element={<AppointmentList />} />
          <Route path="appointment/history/" element={<AppointmentHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
