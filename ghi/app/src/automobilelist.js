  import React, { useEffect, useState, } from "react";
  import { Link } from "react-router-dom";

  function AutomobileList() {
      const [automobiles, setAutomobiles] = useState([]);


      const getAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url);

        if (response.ok){
          const data = await response.json();
          const automobiles = data.autos
          setAutomobiles(automobiles)

        }
      }

      console.log(automobiles)

      useEffect(() =>
      {getAutomobiles()}, []
      )


      return (
              <table className="table table-striped">
                  <thead>
                  <tr>
                      <th>Automobiles</th>
                      <th>Color</th>
                      <th>Model</th>
                      <th>Manufacturer</th>

                  </tr>
                  </thead>
                  <tbody>
                  {automobiles.map(automobile => {
                  return (
                      <tr key={automobile.id}>
                      <td>{ automobile.vin }</td>
                      <td>{ automobile.color }</td>
                      <td>{ automobile.model.name }</td>
                      <td>{ automobile.model.manufacturer.name }</td>
                      </tr>
                  );
                  })}
                  </tbody>
              </table>
      )
  }

  export default AutomobileList;
