/**
 * Save a book to the database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        const BookModel = objRepo.BookModel;
        if (typeof req.body.title === 'undefined' ||
            typeof req.body.author === 'undefined' ||
            typeof req.body.ReleaseDate === 'undefined' ||
            typeof req.body.PageCount === 'undefined' ||
            typeof req.body.WordCount === 'undefined') {
            return next();
        }

        let book = new BookModel(res.locals.book);
        //alternaative
        //let book = res.locals.book || new BookModel();
        if (typeof res.locals.book !== 'undefined') {
            book = res.locals.book;
        }

        book.title = req.body.title;
        book.author = req.body.author;
        book.ReleaseDate = new Date(req.body.ReleaseDate);
        book.PageCount = parseInt(req.body.PageCount);
        book.WordCount = parseInt(req.body.WordCount);

        return book.save().then(() => {
            return res.redirect('/manage_books');
        }).catch((err) => {
            return next(err);
        })

    }
}