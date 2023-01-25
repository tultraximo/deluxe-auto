import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);


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

    console.log(appointments)

    return (
      <>
        <div className="container p-0">
          <div className="row">
            <div className="col">
              <h2 className="my-3">Service appointments</h2>
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
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const newdate = new Date(appointment.time);
              const options = { timeStyle: "short" };
              if (
                appointment.canceled === false &&
                appointment.completed === false
              ) {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.service_vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{newdate.toLocaleDateString()}</td>
                    <td>{newdate.toLocaleTimeString([], options)}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    {/* {this.hasVIP(appointment.discount)} */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) =>
                          console.log(appointments)
                        }
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) =>
                          console.log(appointments)
                        }
                      >
                        Completed
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </>
    );
  }

export default AppointmentList;
