/**
 * Render middleware
 * @param objRepo 
 * @param view
 */
module.exports = (objRepo, view) => {
    return (req, res, next) => {
        // Make req available to templates
        res.locals.req = req;
        
        return res.render(view, res.locals);
    }
}