/**
 * Login middleware
 * @param objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        if (req.method === 'GET' || 
            typeof req.body.username === 'undefined' ||
            typeof req.body.password === 'undefined') {
            return next();
        }
        
        return UserModel.findOne({
            username: req.body.username
        }).then(user => {
            if (!user || user.password !== req.body.password) {
                req.session.error = 'Invalid username or password';
                return res.redirect('/login');
            }
            
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.role = user.role;
            req.session.loggedIn = true;
            
            return res.redirect('/');
        }).catch(err => {
            return next(err);
        });
    };
}