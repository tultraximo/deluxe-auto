  import React, { useEffect, useState } from 'react';

function ModelForm () {

  const [name, setName] = useState('');
  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
  }

  const [picture_url, setPicture_url] = useState('');
  const handlePicture_urlChange = (event) => {
      const value = event.target.value;
      setPicture_url(value);
    }

  const [selectedmanufacturer, setSelectedManufacturer] = useState('');
  const handleSelectedManufacturerChange = (event) => {
      const value = event.target.value;
      setSelectedManufacturer(value);
    }

  const [manufacturers, setManufacturer] = useState([]);

  const getManufacturers = async () => {
  const url = 'http://localhost:8100/api/manufacturers/'
  const response = await fetch(url);

  if (response.ok){
    const data = await response.json();
    const manufacturers = data.manufacturers
    setManufacturer(manufacturers)
    }
    }


  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {}
      data.name = name
      data.picture_url = picture_url
      data.manufacturer_id = selectedmanufacturer

      const url = 'http://localhost:8100/api/models/';
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          },
      };

      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const newModel = await response.json();
        console.log(newModel);

        setName('');
        setPicture_url('');
        setSelectedManufacturer('');
      }
    }

        useEffect(() => {
          getManufacturers();
          }, []);



    return (
        <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add Model</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">

                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handlePicture_urlChange} value={picture_url} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                        <label htmlFor="picture_url">Picture</label>
                    </div>

                    <div className="mb-3">
                        <select onChange={handleSelectedManufacturerChange} required id="manufacturer" name="manufacturer" className="form-select">
                        <option value="">Choose a Manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                        </option>
                    );
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

export default ModelForm;
