/**
 * Logout middleware
 * @param objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                return next(err);
            }
            // Redirect to login page
            return res.redirect('/login');
        });
    }
}