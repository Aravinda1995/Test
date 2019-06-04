const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const author = require('../Schema/authorSchema');


router.post('/', (req,res, next) => {
   const newAuthor = new author({
       _id: new mongoose.Types.ObjectId,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       nationality: req.body.nationality
   });

   newAuthor.save()
       .then(() => {
           res.status(200).json({
               message: "author added successfully"
           });
       })
       .catch(() => {
           res.status(500).json({
               error: "Unable to add author"
           })
       })
});

router.get('/', (req,res, next) => {
   author.find().select({"firstName": 1, "lastName": 1, "_id": 0})
       .exec()
       .then(authors => {
           if(authors.length < 1){
               res.status(500).json({
                   error: "Unable to get the authors"
               })
           } else {
               res.status(200).json(authors)
           }
       })
});

module.exports = router;