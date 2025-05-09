/**
 * Load the users from the database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const UserModel = objRepo.UserModel;

    return (req, res, next) => {
        return UserModel.find({}).then((users) => {
            res.locals.users = users;
            next();
        }).catch((err) => {
            return next(err);
        });
    }
}
