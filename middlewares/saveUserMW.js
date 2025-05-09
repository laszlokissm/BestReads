/**
 * Save user to database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;
    
    return (req, res, next) => {
        if (typeof req.body.username === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined') {
            return next();
        }

        let user;
        if (typeof res.locals.user !== 'undefined') {
            // Edit existing user
            user = res.locals.user;
        } else {
            // Create new user
            user = new UserModel();
            // For new users, password is required
            if (typeof req.body.password === 'undefined' || req.body.password.trim() === '') {
                return next();
            }
            user.password = req.body.password;
        }

        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        
        // Only update password if provided on edit
        if (res.locals.user !== undefined && req.body.password && req.body.password.trim() !== '') {
            user.password = req.body.password;
        }
        
        // Set role if provided, default to 'user'
        user.role = req.body.role || 'user';

        return user.save().then(() => {
            return res.redirect('/users');
        }).catch((err) => {
            return next(err);
        });
    }
}
