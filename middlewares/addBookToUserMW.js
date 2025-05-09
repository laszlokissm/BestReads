/**
 * Add a book to a user's collection
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        // Ensure user is logged in and we have a book
        if (!req.session || !req.session.userId || !res.locals.book) {
            return next();
        }
        
        // Find the user
        return UserModel.findById(req.session.userId)
            .then((user) => {
                if (!user) {
                    return next();
                }
                
                // Check if the book is already in the user's collection
                const bookExists = user.books.some(item => 
                    item.book && item.book.toString() === res.locals.book._id.toString()
                );
                
                if (bookExists) {
                    // Book already added
                    return res.redirect('/browse');
                }
                
                // Add the book to the user's collection with no tag initially
                user.books.push({
                    book: res.locals.book._id,
                    tag: null
                });
                
                // Save the user
                return user.save().then(() => {
                    return res.redirect('/');
                });
            })
            .catch((err) => {
                return next(err);
            });
    };
}