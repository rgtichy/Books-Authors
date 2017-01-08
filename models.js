var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/books_authors_db");
mongoose.connection.on('connected', function(){
    console.log("database connected");
});

var bookSchema = mongoose.Schema({
    title: { type: String, require: true },
    publishDate: Date,
    publisher: { type: String, require: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

var authorSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    birthDate: Date,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

var Book = mongoose.model("Book", bookSchema);
var Author = mongoose.model("Author", authorSchema);

module.exports = {
    Book,
    Author
}
