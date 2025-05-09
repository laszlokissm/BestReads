/**
 * Middleware to handle user registration.
 * @param {Object} objRepo - Object repository for shared dependencies.
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        // Check if all required fields are present
        if (typeof req.body.username === 'undefined' ||
            typeof req.body.password === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined') {
            return next();
        }
        
        // Create a new user with the provided details
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // Default to 'user' role if not specified
            role: req.body.role || 'user',
            // Initialize empty books array
            books: []
        });
        
        // Save the new user to the database
        return newUser.save()
            .then(() => {
                // Redirect to login page after successful registration
                return res.redirect('/login');
            })
            .catch(err => {
                // Pass errors to the error handler
                return next(err);
            });
    };
};
