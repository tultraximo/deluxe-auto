import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";

function ModelList() {
    const [models, setModels] = useState([]);


    const getModels = async () => {
      const url = 'http://localhost:8100/api/models/'
      const response = await fetch(url);

      if (response.ok){
        const data = await response.json();
        const models = data.models
        setModels(models)
      }
    }


    useEffect(() =>
    {getModels()}, []
    )


    return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
                </thead>
                <tbody>
                {models.map(model => {
                return (
                    <tr key={model.id}>
                    <td>{ model.name }</td>
                    <td>{ model.manufacturer.name }</td>
                    <td><img
                      className="img-thumbnail"
                      src={model.picture_url}
                      height={100}
                      width={100}
                      alt="model"
                    />
                    </td>
                    </tr>
                );
                })}
                </tbody>
            </table>
    )
}

export default ModelList;
