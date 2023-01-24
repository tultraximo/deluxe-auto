import React, { useEffect, useState } from 'react';

function TechnicianForm () {
    const [name, setName] = useState([]);
    const [employee_number, setEmployee_number] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name
        data.employee_number = employee_number


        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
          const newTechnician = await response.json();
          console.log(newTechnician);

          setName('');
          setEmployee_number('');
        }
      }



    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
      }

      const handleEmployee_numberChange = (event) => {
        const value = event.target.value;
        setEmployee_number(value);
      }


        // useEffect(() => {
        //     fetchData();
        //   }, []);



    return (
        <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployee_numberChange} value={employee_number} placeholder="employee_number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                        <label htmlFor="employee_number">Employee Number</label>
                    </div>


                    <button className="btn btn-primary">Create</button>


                    </form>

                </div>
                </div>
        </div>
        );
}

export default TechnicianForm;
