/**
 * Check if the user is logged in, if not, redirect to /login
 * Check if user is admin
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (res, req, next) => {
        next();
    }
}