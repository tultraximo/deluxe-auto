import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";


function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [inputvin, setInputVIN] = useState('');
    // const [filtered, setFiltered] = useState([]);

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
              {/* <Link to="/appointments">
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </Link> */}
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
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              // const newdate = new Date(appointment.time);
              // const options = { timeStyle: "short" };
              if (
                inputvin === appointment.service_vin
              ) {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.service_vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>"//"</td>
                    <td>"//"</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    {/* {this.hasVIP(appointment.discount)} */}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </>
    );
  }

export default AppointmentHistory;










  // function hasVIP(value)
  // {
  //   if(value){
  //     return <td>&#10004;</td>;
  //   } else {
  //     return <td></td>;
  //   }
  // }

  // async cancelAppointment(id) {
  //   const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
  //   const fetchConfig = {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     this.componentDidMount();
  //   }
  // }

  // async completeAppointment(id) {
  //   const url = `http://localhost:8080/api/appointments/${id}/complete/`;
  //   const fetchConfig = {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await fetch(url, fetchConfig);
  //   if (response.ok) {
  //     this.componentDidMount();
  //   }
  // }
