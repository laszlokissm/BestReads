/**
 * Login middleware
 * @param objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        // If GET request or no form data, just render the login page
        if (req.method === 'GET' || 
            typeof req.body.username === 'undefined' ||
            typeof req.body.password === 'undefined') {
            return next();
        }
        
        // Find user by username
        return UserModel.findOne({
            username: req.body.username
        }).then(user => {
            // If user not found or password doesn't match
            if (!user || user.password !== req.body.password) {
                // Store error in session and redirect
                req.session.error = 'Invalid username or password';
                return res.redirect('/login');
            }
            
            // Store user info in session
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.role = user.role;
            req.session.loggedIn = true;
            
            // Redirect to home page
            return res.redirect('/');
        }).catch(err => {
            return next(err);
        });
    };
}