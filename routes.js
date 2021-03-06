var { AuthorsController, BooksController  } = require('./controllers');

module.exports = function(app){
    app.post("/authors", AuthorsController.create);
    app.get("/authors", AuthorsController.index);
    app.get("/authors/:id/show", AuthorsController.show);
    app.post("/authors/:id/update", AuthorsController.update);
    app.post("/authors/:id/destroy", AuthorsController.delete);
    app.post("/authors/:id/delete", AuthorsController.delete);
    app.post("/books", BooksController.create);
    app.get("/books/:id/show", BooksController.show);
    app.post("/books/:id/update", BooksController.update);
    app.post("/books/:id/delete", BooksController.delete);
    app.post("/books/:id/destroy", BooksController.delete);
}
