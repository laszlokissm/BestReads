/**
 * Delete a book from the database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        return res.locals.book.deleteOne().then(() => {
            return res.redirect('/manage_books');
        }).catch((err) => {
            return next(err);
        });
    }
}