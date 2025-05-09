/**
 * Load the user with the given id from the database, if it doesn't exist, redirect to /users
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        UserModel.findById(req.params.userid)
            .populate('books')
            .then(user => {
                if (!user) {
                    return res.redirect('/users');
                }
                
                res.locals.user = user;
                return next();
            })
            .catch(err => {
                return next(err);
            });
    }
}
