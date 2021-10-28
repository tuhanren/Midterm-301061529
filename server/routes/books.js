// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('books/details', { title: 'Add', page: 'add', books: '' });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newBookItem = new book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });
  book.create(newBookItem, (err, book) => {
      if (err) {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;
     book.findById(id, {}, {}, (err, bookItemToEdit) => {
         if (err) {
             console.error(err);
             res.end(err);
         }
         res.render('books/details', { title: 'Edit', page: 'edit', books: bookItemToEdit });
     });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;
     let updatedBookItem = new book({
         "_id": id,
         "Title": req.body.title,
         "Description": req.body.description,
         "Price": req.body.price,
         "Author": req.body.author,
         "Genre": req.body.genre
     });
     book.updateOne({ _id: id }, updatedBookItem, {}, (err) => {
         if (err) {
             console.error(err);
             res.end(err);
         }
         res.redirect('/books');
     });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;
     book.remove({ _id: id }, (err) => {
         if (err) {
             console.error(err);
             res.end(err);
         }
         res.redirect('/books');
     });
});


module.exports = router;
