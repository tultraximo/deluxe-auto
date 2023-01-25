import React, { useEffect, useState } from 'react';

function AppointmentForm () {
    const [technician, setTechnician] = useState([]);
    const [selectedtechnician, setSelectedTechnician] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [service_vin, setService_vin] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.customer_name = customer_name
        data.time = time
        data.reason = reason
        data.service_vin = service_vin
        data.technician = selectedtechnician

        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const newAppointment = await response.json();
          console.log(newAppointment);

          setService_vin('');
          setReason('');
          setTime('');
          setCustomer_name('');
          setSelectedTechnician('');

        }
      }



    const handleService_vinChange = (event) => {
        const value = event.target.value;
        setService_vin(value);
      }

      const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
      }

      const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
      }
      const handleCustomer_nameChange = (event) => {
        const value = event.target.value;
        setCustomer_name(value);
      }

      const handleSelectedTechnicianChange = (event) => {
        const value = event.target.value;
        setSelectedTechnician(value);
      }


    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/"

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnician(data.technicians)
        }
        }

        useEffect(() => {
            fetchData();
          }, []);



    return (
        <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new appointment</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">

                    <div className="form-floating mb-3">
                        <input onChange={handleService_vinChange} value={service_vin} placeholder="service_vin" required type="text" name="service_vin" id="service_vin" className="form-control"/>
                        <label htmlFor="service_vin">VIN</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleCustomer_nameChange} value={customer_name} placeholder="customer_name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                        <label htmlFor="customer_name">Customer Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleReasonChange} value={reason} placeholder="reason" required type="text" name="reason" id="reason" className="form-control"/>
                        <label htmlFor="reason">Reason</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleTimeChange} value={time} placeholder="time" required type="date" name="time" id="time" className="form-control"/>
                        <label htmlFor="time">Date</label>
                    </div>

                    <div className="mb-3">
                        <select onChange={handleSelectedTechnicianChange} required id="technician" name="technician" className="form-select">
                            <option value="">Choose a Technician</option>
                            {technician.map(tech => {
                                return (
                                <option key={tech.id} value={tech.id}>
                                 {tech.name}
                                </option>
                                )
                            })}
                        </select>
                    </div>


                    <button className="btn btn-primary">Create</button>


                    </form>

                </div>
                </div>
            </div>
        );
}

export default AppointmentForm;
