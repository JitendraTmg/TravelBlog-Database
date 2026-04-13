import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Travel from './models/travelModel.js';

configDotenv();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Jitendra');
});

app.post('/travels', async (req, res) => {
    const { title, description, location, price, rating } = req.body;
    const newTravel = new Travel ({title,description,location,price,rating})
    await newTravel.save();
    res.status(201).json(newTravel);
})


mongoose.connect(
    process.env.MongoDB_URI
).then(() => {
    console.log("Connected to the database");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


