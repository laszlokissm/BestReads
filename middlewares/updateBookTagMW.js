/**
 * Update a book tag in a user's collection
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        // Ensure user is logged in and we have a book
        if (!req.session || !req.session.userId || !res.locals.book) {
            return next();
        }
        // Accept empty string or null for tag removal
        const tag = typeof req.body.tag !== 'undefined' ? req.body.tag : null;
        // Find the user
        return UserModel.findById(req.session.userId)
            .then((user) => {
                if (!user) {
                    return next();
                }
                // Find the book in the user's collection
                const bookIndex = user.books.findIndex(item => 
                    item.book && item.book.toString() === res.locals.book._id.toString()
                );
                // If book found, update its tag (or remove it)
                if (bookIndex !== -1) {
                    user.books[bookIndex].tag = tag && tag.trim() !== '' ? tag : null;
                    // Save the user
                    return user.save().then(() => {
                        return res.redirect('/');
                    });
                } else {
                    // Book not found in user's collection
                    return res.redirect('/');
                }
            })
            .catch((err) => {
                return next(err);
            });
    };
}