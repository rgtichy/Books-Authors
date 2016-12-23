var { Book, Author } = require('./models');

var AuthorsController = {
    create: function(req,res){
    // console.log(req.body);
        Author.create(req.body)
            .then(function(newAuthor){
                res.json(newAuthor);
            })
            .catch(function(error){
                res.status(500);
                res.json(error);
        });
    },
    index: function(req,res){
        Author.find({})
            .populate('books')
            .exec()
            .then(function(authors){
                res.json(authors);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    },
    update: function(req, res){
        Author.update({ _id: req.params.id }, req.body)
        .then(function(){
            res.json({success: true});
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    }
}

var BooksController = {
    create : function(req, res){
        var newBook;

        Book.create(req.body)
        .then(function(book){
            newBook = book;
            return Author.findById(newBook.author)
        })
        .then(function(author){
            author.books.push(newBook._id);
            return author.save()
        })
        .then(function(){
            res.json(newBook);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    }
}


module.exports = {
    AuthorsController,
    BooksController
}