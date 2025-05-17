/**
 * Logout middleware
 * @param objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        req.session.destroy(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/login');
        });
    }
}