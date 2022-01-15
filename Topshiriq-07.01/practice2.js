"use strick";
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/practice2").then(() => console.log('MongoDBga ulanish hosil qilindi...'))
    .catch((err) => console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err));

const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});
const bookSchema = new mongoose.Schema({
    title: String,
    authors: {
        type: [authorSchema],
        required: true
    },
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

async function createBook(title, authors) {
    const book = new Book({
        title: title,
        authors: authors,
    });
    const result = await book.save();
    console.log(result);
}

createBook('NodeJS - To\'liq qo\'llanma',
    [
        new Author({
            firstName: "Rakhmatillo",
            lastName: "Rustamov",
            email: "rrr@gmail.com"
        }),
        new Author({
            firstName: "Xidirboy",
            lastName: "Rustamov",
            email: "rxr@gmail.com"
        }),
    ]
);

async function updateBook(id) {
    const result = await Book.updateOne({
        _id: id
    }, {
        $unset: ({
            "author": ""
        })
    });
    console.log(result);
}
// updateBook("61de191de91fded81bc20b3d");

// listBooks("61dc598dbc98a1840df97f08");




// in GitBash:
// node door/topshiriq-07.00/practice.js