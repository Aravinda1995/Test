const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const book = require('../Schema/bookSchema');

var priceArray = [];

router.post('/', (req, res, next) => {
   const newBookEntry = new book({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       isbn: req.body.isbn,
       author: req.body.author,
       price: req.body.price,
       yearOfPublication: req.body.yearOfPublication,
       publisher: req.body.publisher
   });

   newBookEntry.save().then(() => {
       res.status(200).json({
           message: "Book added successfully"
       });
   }).catch(err => {
      res.status(500).json({
          error: err
      });
   });
});

router.get('/', (req,res, next) => {
   book.find()
       .select({"name": 1, "isbn": 1, "author": 1, "price": 1,"yearOfPublication": 1,"publisher": 1, "_id": 0})
       .exec()
       .then(allBooks => {
           if(allBooks.length < 1){
               res.status(404).json({
                   message: "Books not found"
               })
           } else {
               res.status(200).json(allBooks)
           }
       })
       .catch(() => {
           res.status(500).json({
               error: "Unable to get details"
           })
        });
});

router.get('/:bookAuthor', (req,res, next) => {
    let bookAuthor = req.params.bookAuthor;
    let str = bookAuthor.replace(/ +/g, "");

    book.find({ author: str })
       .exec()
       .then(books => {
            if(books.length < 1) {
                res.status(404).json({
                    message: "Unknown author"
                });
            } else {
                res.status(201).json(books);
            }
        })
});

module.exports = router;