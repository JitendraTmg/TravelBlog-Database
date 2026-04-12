import { configDotenv } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

configDotenv();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Jitendra');
});

mongoose.connect(
    process.env.MongoDB_URI
).then(() => {
    console.log("Connected to the database");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


