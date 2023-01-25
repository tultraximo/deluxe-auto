import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './technicianform';
import AppointmentForm from './appointmentform';
import AppointmentList from './appointmentlist';
import AppointmentHistory from './appointmenthistory';
import ManufacturerList from './manufacturerlist';
import ModelList from './modellist';
import AutomobileList from './automobilelist';
import ManufacturerForm from './manufacturerform';
import ModelForm from './modelform';
import AutomobileForm from './automobileform';


function App() {


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technician/add/" element={<TechnicianForm />} />
          <Route path="appointment/add/" element={<AppointmentForm />} />
          <Route path="appointment/view/" element={<AppointmentList />} />
          <Route path="appointment/history/" element={<AppointmentHistory />} />
          <Route path="manufacturer/view/" element={<ManufacturerList />} />
          <Route path="manufacturer/add/" element={<ManufacturerForm />} />
          <Route path="model/view/" element={<ModelList />} />
          <Route path="model/add/" element={<ModelForm />} />
          <Route path="automobile/view/" element={<AutomobileList />} />
          <Route path="automobile/add/" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
