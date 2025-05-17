/**
 * Middleware to handle user registration.
 * @param {Object} objRepo - Object repository for shared dependencies.
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        if (typeof req.body.username === 'undefined' ||
            typeof req.body.password === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined') {
            return next();
        }
        
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role || 'user',
            books: []
        });
        
        return newUser.save()
            .then(() => {
                return res.redirect('/login');
            })
            .catch(err => {
                return next(err);
            });
    };
};
