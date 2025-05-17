/**
 * Load books belonging to the current logged-in user
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        if (!req.session || !req.session.userId) {
            return next();
        }
        
        return UserModel.findById(req.session.userId)
            .populate('books.book')
            .then((user) => {
                if (!user) {
                    return next();
                }
                
                if (req.query.tag) {
                    res.locals.activeTag = req.query.tag;
                    res.locals.books = user.books.filter(item => item.tag === req.query.tag);
                } else {
                    res.locals.activeTag = null;
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