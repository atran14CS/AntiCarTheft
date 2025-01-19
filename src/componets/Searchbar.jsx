import axios from "axios";
import { useEffect, useState } from "react";

const COMMON_MAKES = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai",
  "Jeep", "Subaru", "Kia", "Volkswagen", "Dodge", "Mercedes-Benz",
  "BMW", "Mazda", "Lexus", "Tesla", "GMC", "Audi", "Ram", "Cadillac"
];




const Searchbar = () => {

  const [carMake, setCarMake] = useState("");
  const [model, setModel] = useState();

  useEffect(() => {
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${carMake}?format=json`)
      .then((response) => setModel(response.data))
      .catch((error) => console.log(error))
  })

  console.log(model);

  return (
    <div>
        <select name="car-make" id="car-make" onChange={e =>setCarMake(e.target.value)}>
            <option value="default">Make</option>
            <optgroup label="Car Makes">
                {COMMON_MAKES.map((make, index) => (
                    <option key={index} value={make}>{make}</option>
                ))}
            </optgroup>
        </select>
    </div>
  )
}

export default Searchbar
