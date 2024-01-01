import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.use(cors({
    
})); 

app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('My First Mern App');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error);
    });