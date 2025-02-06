import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

const NewInfo = () => {
  const [stolenCars, setStolenCars] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getStolenCars')
    .then((response) => {
      setStolenCars(response.data);
    })
  })

  return (
    <div>
      <h1>Stolen Cars</h1>
      <table>
        <tr>
          <td>Make</td>
          <td>Model</td>
          <td>License Plate</td>
          <td>State</td>
        </tr>
        {stolenCars.map((car) => {
          return (
            <tr key={car.licensePlate}>
              <td>car.make</td>
              <td>car.model</td>
              <td>car.licensePlate</td>
              <td>car.state</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default NewInfo
