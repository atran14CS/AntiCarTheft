import axios from "axios";
import { useEffect, useState } from "react";
import { COMMON_MAKES } from "../models/commonMakes";
import { STATES } from "../models/states";

/**
 * Searchbar componet holds carmake, model, state, and liscense plate useStates
 * Searchbar will be use to find stolen veichles
 * @returns Searchbar componet
 */
const Searchbar = () => {
  const [carMake, setCarMake] = useState("");
  const [models, setModels] = useState([]);
  const [selctedModel, setSelectModel] = useState("");
  const [state, setState] = useState("");
  const [liscensePlate, setLiscensePlate] = useState("");

  /**
   * Every time a car make is selected fetch the models associated to the make
   */
  useEffect(() => {
    const fetchModels = async () => {
      if (!carMake || carMake === "default") return;
      try {
        const { data } = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${carMake}?format=json`
        );
        setModels(data.Results);
      } catch (error) {
        console.error("Error fetching car models:", error);
      }
    };
    fetchModels();
  }, [carMake]);

  return (
    <div>
      <select name="car-make" id="car-make" onChange={(e) => setCarMake(e.target.value)}>
        <option value="default">Make</option>
        <optgroup label="Car Makes">
          {COMMON_MAKES.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
        </optgroup>
      </select>
      <select name="car-model" id="car-model" onChange={(e) => setSelectModel(e.target.value)}>
        <option value="default">Model</option>
        <optgroup label="Car Models">
          {models.map((model, index) => (
            <option key={index} value={model.Model_Name}>
              {model.Model_Name}
            </option>
          ))}
        </optgroup>
      </select>
      <select name="state" id="state" onChange={(e) => setState(e.target.value)}>
          <option value="default">State</option>
          <optgroup label="States">
            {STATES.map((state, index) => (
              <option key={index} value={state.abbr}>
                {state.abbr}
              </option>
            ))}
          </optgroup>
      </select>
      <button>Search</button>
      <p>or</p>
      <input type="text" placeholder="LISCENSCE PLATE #" onChange={(e) => setLiscensePlate(e.target.value)}/>
      <button>Search</button>
    </div>
  );
};

export default Searchbar;
