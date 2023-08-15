import React, { useEffect, useState } from 'react';

function AutomobileForm() {

  const [color, setColor] = useState('');
  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const [year, setYear] = useState('');
  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  }

  const [vin, setVIN] = useState('');
  const handleVINChange = (event) => {
    const value = event.target.value;
    setVIN(value);
  }

  const [selectedmodel_id, setSelectedModel_id] = useState('');
  const handleSelectedModel_idChange = (event) => {
    const value = event.target.value;
    setSelectedModel_id(value);
  }

  const [models, setModels] = useState([]);

  const getModels = async () => {
    const url = 'http://localhost:8100/api/models/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const models = data.models
      setModels(models)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {}
    data.color = color
    data.year = year
    data.vin = vin
    data.model_id = selectedmodel_id

    const url = 'http://localhost:8100/api/automobiles/';
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

      setColor('');
      setYear('');
      setVIN('');
      setSelectedModel_id('');
    }
  }

  useEffect(() => {
    getModels();
  }, []);



  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Automobile</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">

            <div className="form-floating mb-3">
              <input onChange={handleColorChange} value={color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleYearChange} value={year} placeholder="year" required type="text" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleVINChange} value={vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>

            <div className="mb-3">
              <select onChange={handleSelectedModel_idChange} required id="model_id" name="model_id" className="form-select">
                <option value="">Choose a Model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
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

export default AutomobileForm;
