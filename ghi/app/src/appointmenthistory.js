import React, { useEffect, useState, } from "react";

function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [inputvin, setInputVIN] = useState('');


    const handleInputVINChange = (event) => {
        const value = event.target.value;
        setInputVIN(value);
      }


    const getAppointments = async () => {
      const url = "http://localhost:8080/api/appointments/"
      const response = await fetch(url)

      if(response.ok){
        const data = await response.json()
        setAppointments(data.appointments)
      }
    }


    useEffect(() =>
      {getAppointments()}, []
    )


    return (
      <>
        <div className="container p-0">
          <div className="row" >
            <div className="col d-flex justify-content-center align-items-center">
            <h2 className="my-3">Service appointments</h2>
            </div>
            <div className="row">

            <form  id="appointments-history-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleInputVINChange} value={inputvin} placeholder="inputvin" required type="text" name="inputvin" id="inputvin" className="form-control"/>
                        <label htmlFor="inputvin">Enter Full VIN Number</label>
                    </div>
                    <button className="btn btn-primary">Search</button>
            </form>

            </div>
            <div className="col-sm-auto d-flex justify-content-center align-items-center">

            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Technician</th>
              <th>VIP</th>
              <th>Canceled?</th>
              <th>Completed?</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const newdate = new Date(appointment.time);
              const options = { timeStyle: "short" };
              if (
                inputvin === ""
              ) {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.service_vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{newdate.toLocaleDateString()}</td>
                    <td>{newdate.toLocaleTimeString([], options)}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.canceled.toString()}</td>
                    <td>{appointment.completed.toString()}</td>
                  </tr>
                );
              }
              else if (inputvin === appointment.service_vin) {
                // Display appointments based on inputvin
                return (
                    <tr key={appointment.id}>
                        <td>{appointment.service_vin}</td>
                        <td>{appointment.customer_name}</td>
                        <td>{newdate.toLocaleDateString()}</td>
                        <td>{newdate.toLocaleTimeString([], options)}</td>
                        <td>{appointment.technician.name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.canceled.toString()}</td>
                        <td>{appointment.completed.toString()}</td>
                    </tr>
                );
            } else {
                return null; // Skip rendering if not matching the condition
            }
            })}
          </tbody>
        </table>
      </>
    );
  }

export default AppointmentHistory;
