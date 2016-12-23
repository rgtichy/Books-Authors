var { AuthorsController, BooksController  } = require('./controllers');

module.exports = function(app){
    app.post("/authors", AuthorsController.create);
    app.get("/authors", AuthorsController.index);
    app.post("/authors/:id/update", AuthorsController.update);
    app.post("/books", BooksController.create);
}
