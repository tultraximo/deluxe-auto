import React, { useEffect, useState, } from "react";

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

    // write a function to update z

    const updateVipStatus = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}/update-vip/`;
      const fetchConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointment_id: appointmentId }),
      }
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        getAppointments();
      } else {
        console.log("Update Failed", response.statusText)
      }
    }

    // const url = 'http://localhost:8080/api/appointments/';
    // const fetchConfig = {
    //   method: "post",
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     },
    // };

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
              <th>Date</th>
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
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.service_vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{newdate.toLocaleDateString()}</td>
                    <td>{newdate.toLocaleTimeString([], options)}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{String(appointment.vip)}
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          // console.log(appointments)
                          updateVipStatus(appointment.id)
                        }
                        style={{ marginLeft: "8px" }}  // Add some margin to the right
                      >
                        VIP?
                      </button>
                    </td>
                    {/* {Vip} write a function for the onclick below, that updates model to true*/}
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(event) =>
                          console.log(appointments)

                        }
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(event) =>
                          console.log(appointments)
                        }
                      >
                        Completed
                      </button>
                    </td>
                  </tr>
                );

            })}
          </tbody>
        </table>
      </>
    );
  }

export default AppointmentList;
