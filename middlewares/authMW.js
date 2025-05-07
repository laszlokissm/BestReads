/**
 * Check if the user is logged in, if not, redirect to /login
 * Check if user is admin
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        return next();
        // TODO admin / user
        /* 
        if (req.session.loggedIn === true) {
            return res.redirect('/login');
        }
        */
    }
}