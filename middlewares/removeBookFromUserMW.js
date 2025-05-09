/**
 * Remove a book from a user's collection
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
                
                // Remove the book from the user's collection
                user.books = user.books.filter(item => 
                    !item.book || item.book.toString() !== res.locals.book._id.toString()
                );
                
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