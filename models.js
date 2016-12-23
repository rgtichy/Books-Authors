var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/books_authors_db");
mongoose.connection.on('connected', function(){
    console.log("database connected");
});

var bookSchema = mongoose.Schema({
    title: String,
    publishDate: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

var authorSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

var Book = mongoose.model("Book", bookSchema);
var Author = mongoose.model("Author", authorSchema);

module.exports = {
    Book,
    Author
}