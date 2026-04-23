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

app.get('/travels', async (req, res) => {
    const travels = await Travel.find();
    res.status(200).json(travels);
});

app.get('/travels/:id', async (req, res) => {
    const { id } = req.params;
    const travel = await Travel.findById(id);
    if (!travel) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json(travel);
});

app.put('/travels/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, location, price, rating } = req.body;
    const updatedTravel = await Travel.findByIdAndUpdate(id, { title, description, location, price, rating }, { new: true });
    if (!updatedTravel) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json(updatedTravel);
});

app.delete('/travels/:id', async (req, res) => {
    const { id } = req.params;
    const deletedTravel = await Travel.findByIdAndDelete(id);
    if (!deletedTravel) {
        return res.status(404).json({ message: 'Travel not found' });
    }
    res.status(200).json({ message: 'Travel deleted successfully' });
});

mongoose.connect(
    process.env.MongoDB_URI
).then(() => {
    console.log("Connected to the database");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


