var { AuthorsController, BooksController  } = require('./controllers');

module.exports = function(app){
    app.post("/authors", AuthorsController.create);
    app.get("/authors", AuthorsController.index);
    app.post("/authors/:id/update", AuthorsController.update);
    app.post("/authors/:id/destroy", AuthorsController.delete);
    app.post("/authors/:id/delete", AuthorsController.delete);
    app.post("/books", BooksController.create);
    app.post("/books/:id/delete", BooksController.delete);
    app.post("/books/:id/destroy", BooksController.delete);
}
