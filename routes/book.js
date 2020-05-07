const User = require("../models/User");
const Book = require("../models/Book");
const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const axios = require('axios');
const request = require("request");

//get all books from google api
router.get("/", async (req, res) => {
  try {
    const books = await axios.get("https://www.googleapis.com/books/v1/volumes?q=novels&orderBy=newest&projection=lite");
    //console.log(books.data)
    res.json(books.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// get all user books
router.get("/myBooks", auth, async (req, res) => {
  try {
    //const books = await Book.find({owner: req.user._id})
    await req.user
      .populate({
        path: "books",
      })
      .execPopulate();
    //console.log(req.user.books)
    res.status(200).send(req.user.books);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg: error.message});
  }
});

// get book from google api by title
router.get("/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    res.json(books.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Server Error... ": error.message});
  }
 
});

// add book to user
router.post("/", auth, async (req, res) => {
  var book = new Book({
    ...req.body,
  });
  book.owner = req.user._id;
  //console.log(book);

  try {
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// get book by its id
router.get("/:bookId", auth, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      
      return res.status(404).json({ msg: "Book not found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    
    if (error.kind === "ObjectId")
      return res.status(404).json({ msg: "Book not found!" });
    console.error(error.message);
    res.status(500).json('Server Error!');
  }
});

// delete book by id
router.delete("/:bookId", auth , async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      //console.log('sss')
      return res.status(404).json({msg: 'No Book Found!'});
    }

    //console.log(book.owner , req.user._id)
    if (book.owner.toString() !== req.user.id){
      return res.status(401).json({ msg: "User not authorized!" });
    }
      

    await book.remove();
    res.status(200).send(book);
  } catch (error) {
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Book not found!" });
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

module.exports = router;
