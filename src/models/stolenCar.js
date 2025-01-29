import mongoose from "mongoose";

/**
 * Stolen Car schema
 */
const stolenCar = new mongoose.Schema({
    licensePlate: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    vin: { type: String, required: true },
    date: { type: Date, required: true }
});

const StolenCar = mongoose.model('StolenCar', stolenCar);
export default StolenCar;