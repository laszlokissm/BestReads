/**
 * Check if the user is logged in, if not, redirect to /login
 * Check if user is admin if user tries navigating to an admin page
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        if (!req.session || !req.session.loggedIn) {
            return res.redirect('/login');
        }
        
        const isManageRoute = req.path.includes('/manage_') || 
                             req.path.includes('/book/new') || 
                             req.path.includes('/book/edit') || 
                             req.path.includes('/book/del') || 
                             req.path.includes('/user/');
        
        if (req.session.role !== 'admin' && isManageRoute) {
            return res.redirect('/');
        }
        
        return next();
    };
}