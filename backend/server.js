/* eslint-env node */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import StolenCar from './models/stolenCar.js';
import Comment from './models/comment.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
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

app.get('/api/getStolenCar/:licensePlate', async (req, res) => {
    let licensePlate = req.params.licensePlate;
    try {
        let stolenCar = await StolenCar.findOne({licensePlate});
        if(stolenCar) {
            console.log("stolen car exists");
            res.status(200).json(stolenCar);
        } else {
            res.status(404).send("Car not found");
        }
    } catch (error) {
        console.log('Error occurred while trying to get stolen car');
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/api/getComments/:licensePlate', async (req, res) => {
    let licensePlate = req.params.licensePlate;
    try {
        let comments = await Comment.find({licensePlate});
        console.log(comments);
        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).send("Comments not found");
        }
    } catch (error) {
        console.log('Error occurred while trying to get comments');
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/addComment', async (req, res) => {
    let { licensePlate, username, message } = req.body;
    try {
        let existingCar = await Comment.findOne({ licensePlate });
        if (!existingCar) {
            existingCar = new Comment({
                licensePlate,
                comments: [{ username, message, date: new Date() }]
            });
        } else {
            existingCar.comments.push({ username, message, date: new Date() });
        }
        await existingCar.save();
        console.log("Updated Comments Array:", existingCar.comments);
        res.status(201).json({ message: "Comment added", comments: existingCar.comments });
    } catch (error) {
        console.error('Error occurred while trying to add comment', error);
        res.status(500).send("Internal Server Error");
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));