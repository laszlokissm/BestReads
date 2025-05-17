/**
 * Add a book to a user's collection
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    return (req, res, next) => {
        if (!req.session || !req.session.userId || !res.locals.book) {
            return next();
        }
        return UserModel.findById(req.session.userId)
            .then((user) => {
                if (!user) {
                    return next();
                }
                const bookExists = user.books.some(item => 
                    item.book && item.book.toString() === res.locals.book._id.toString()
                );
                if (bookExists) {
                    return res.redirect('/browse');
                }
                user.books.push({
                    book: res.locals.book._id,
                    tag: null
                });
                return user.save().then(() => {
                    return res.redirect('/');
                });
            })
            .catch((err) => {
                return next(err);
            });
    };
}