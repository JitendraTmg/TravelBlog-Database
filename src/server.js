import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Jitendra');
});

mongoose.connect(
    "mongodb+srv://TravelBlog:Travelblog123@cluster0.6prczhr.mongodb.net/?appName=Cluster0"
).then(() => {
    console.log("Connected to the database");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


