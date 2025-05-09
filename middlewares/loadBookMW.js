/**
 * Load the book with the given id from the database, if it doesn't exist, redirect to /
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const BookModel = objRepo.BookModel;
    
    return (req, res, next) => {
        BookModel.findById(req.params.bookid)
            .populate({
                path: '_reviews',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            })
            .then(book => {
                if (!book) {
                    return res.redirect('/');
                }
                
                res.locals.book = book;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    }
}