/**
 * Render middleware
 * @param objRepo 
 * @param view
 */
module.exports = (objRepo, view) => {
    return (req, res, next) => {
        //next();
        return res.render(view,res.locals);
    }
}