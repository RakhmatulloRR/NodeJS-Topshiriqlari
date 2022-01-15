"use strick";
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/practice").then(() => console.log('MongoDBga ulanish hosil qilindi...'))
  .catch((err) => console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err));


const Author = mongoose.model('Author', new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
}));

const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // yozish shart
    ref: "Author" // qaysi xujjatga ko'rsatkich ekanligi keltiriladi, yozish shart emas. 
  },
}));

async function createAuthor(firstName, lastName, email) {
  const author = new Author({
    firstName,
    email,
    lastName,
  });

  const result = await author.save();
  // console.log(result);
}

async function createBook(title, authorId) {
  const book = new Book({
    title: title,
    author: authorId,
  });

  const result = await book.save();
  console.log(result);
}

async function listBooks() {
  const book = await Book
    .find()
    .select('title author')
    .populate("author", "firstName-_id");
  console.log(book);
}

// createAuthor('Farkhod', 'Dadajanov', 'dfarkhod@gmail.com');

// createBook('NodeJS - To\'liq qo\'llanma', '61dc51ba5d9b8d7bbfcb1bfc');

listBooks("61dc598dbc98a1840df97f08");




// in GitBash:
// node topshiriq-07.00/practice.js