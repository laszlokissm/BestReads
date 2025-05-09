/**
 * Load books belonging to the current logged-in user
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        // If user is not logged in, should be caught by authMW, but just in case
        if (!req.session || !req.session.userId) {
            return next();
        }
        
        // Find the current user and populate their books
        return UserModel.findById(req.session.userId)
            .populate('books.book')
            .then((user) => {
                if (!user) {
                    return next();
                }
                
                // Create filtered lists for each tag if a filter is active
                if (req.query.tag) {
                    res.locals.activeTag = req.query.tag;
                    res.locals.books = user.books.filter(item => item.tag === req.query.tag);
                } else {
                    res.locals.activeTag = null; // Always set activeTag to null if not present
                    res.locals.books = user.books;
                }
                
                res.locals.currentUser = user;
                return next();
            })
            .catch((err) => {
                return next(err);
            });
    };
}