/**
 * Load all books from the database
 * @param {object} objRepo
 * @returns {function(*, *, *): *} 
 */
module.exports = (objRepo) => {
    const BookModel = objRepo.BookModel;

    return (req, res, next) => {
        return BookModel.find({}).then((books) => {
            res.locals.books = books;
            next();
        }
        ).catch((err) => {
            return next(err);
        });
    }
}