import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);


    const getManufacturers = async () => {
      const url = 'http://localhost:8100/api/manufacturers/'
      const response = await fetch(url);

      if (response.ok){
        const data = await response.json();
        const manufacturers = data.manufacturers
        setManufacturers(manufacturers)
      }
    }


    useEffect(() =>
    {getManufacturers()}, []
    )


    return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Manufacturer</th>
                </tr>
                </thead>
                <tbody>
                {manufacturers.map(manufacturer => {
                return (
                    <tr key={manufacturer.id}>
                    <td>{ manufacturer.name }</td>
                    </tr>
                );
                })}
                </tbody>
            </table>
    )
}

export default ManufacturerList;
