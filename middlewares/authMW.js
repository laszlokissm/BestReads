/**
 * Check if the user is logged in, if not, redirect to /login
 * Check if user is admin
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // Check if user is logged in
        if (!req.session || !req.session.loggedIn) {
            // If not logged in, redirect to login page
            return res.redirect('/login');
        }
        
        // Check if current route is a manage route that requires admin access
        const isManageRoute = req.path.includes('/manage_') || 
                             req.path.includes('/book/new') || 
                             req.path.includes('/book/edit') || 
                             req.path.includes('/book/del') || 
                             req.path.includes('/user/');
        
        // Check if user is not an admin but trying to access admin routes
        if (req.session.role !== 'admin' && isManageRoute) {
            // Regular users can't access management pages, redirect to home
            return res.redirect('/');
        }
        
        // User is authorized, proceed to the next middleware
        return next();
    };
}