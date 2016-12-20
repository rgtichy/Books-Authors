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
    firstName: String,
    lastName: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

var Book = mongoose.model("Book", bookSchema);
var Author = mongoose.model("Author", authorSchema);

var express = require("express");
var app = express();

var bp = require("body-parser");
app.use(bp.json());
app.post("/authors", function(req,res){
    // console.log(req.body);
    Author.create(req.body)
        .then(function(newAuthor){
            res.json(newAuthor);
        })
        .catch(function(error){
            res.status(500);
            res.json(error);
        });
});

app.listen(8000);