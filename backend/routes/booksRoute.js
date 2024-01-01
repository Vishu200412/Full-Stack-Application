import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();



//Route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Please Send all required Fields: title, author, publishYear',
            }); 
        }
        const newBook = {
            title : request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

//Route for Getting books from database
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    } 
})  

//Route for Getting one book from database
router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    } 
})

//Route to Update a book
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publisher',
            });
        }

        const {id} = request.params; 
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(400).json({message: 'Book not found'})
        }

        return response.status(200).send({message: 'Book updated successfully'});

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

router.delete('/:id', async(req,response) => {
    try{ 
        const {id} = req.params; 
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            console.log("Could not Delete");
            return response.status(404).json({message: 'Book not found'});
            
        }

        return response.status(200).send({message:"Book deleted Successfully"})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router;