/**
 * Update a book tag in a user's collection
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    return (req, res, next) => {
        if (!req.session || !req.session.userId || !res.locals.book) {
            return next();
        }
        const tag = typeof req.body.tag !== 'undefined' ? req.body.tag : null;
        return UserModel.findById(req.session.userId)
            .then((user) => {
                if (!user) {
                    return next();
                }
                const bookIndex = user.books.findIndex(item => 
                    item.book && item.book.toString() === res.locals.book._id.toString()
                );
                if (bookIndex !== -1) {
                    user.books[bookIndex].tag = tag && tag.trim() !== '' ? tag : null;
                    return user.save().then(() => {
                        return res.redirect('/');
                    });
                } else {
                    return res.redirect('/');
                }
            })
            .catch((err) => {
                return next(err);
            });
    };
}