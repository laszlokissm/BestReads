/**
 * Delete user from database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        return res.locals.user.deleteOne().then(() => {
            return res.redirect('/users');
        }).catch((err) => {
            return next(err);
        });
    }
}
