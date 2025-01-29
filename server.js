/* eslint-env node */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import StolenCar from './src/models/stolenCar.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.post('/api/addStolenCar', async (req, res) => {
    let {licensePlate, make, model, state, city, vin} = req.body;
    try {
        let existingCar = await StolenCar.findOne({licensePlate});
        if(existingCar) {
            return res.status(400).send("Car with that license plate already exists");
        }
        if(licensePlate && make && model && state && city && vin) {
            let date = new Date();
            let stolenCar = new StolenCar({
                licensePlate,
                make,
                model,
                state,
                city,
                vin,
                date
            });
            await stolenCar.save();
            res.status(201).json({message: `Stolen car with license plate ${licensePlate} has been added`});
        } else {
            res.status(400).send("Missing required fields");
        }
    } catch (error) {
        console.log("Error occurred while trying to add stolen car");
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/api/getStolenCars', async (req, res) => {
    try {
        let stolenCars = await StolenCar.find();
        res.status(200).json(stolenCars);
    } catch (error) {
        console.log("Error occurred while trying to get stolen cars");
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));