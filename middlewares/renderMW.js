/**
 * Render middleware
 * @param objRepo 
 * @param view
 */
module.exports = (objRepo, view) => {
    return (req, res, next) => {
        res.locals.req = req;
        
        return res.render(view, res.locals);
    }
}