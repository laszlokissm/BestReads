/**
 * Render middleware
 * @param objRepo 
 * @param view
 */
module.exports = (objRepo, view) => {
    return (res, req, next) => {
        //next();
        return res.render(view,{});
    }
}