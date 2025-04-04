const loadBooksMW = require('../middlewares/loadBooksMW');
const loadBookMW = require('../middlewares/loadBookMW');
const deleteBookMW = require('../middlewares/deleteBookMW');
const saveBookMW = require('../middlewares/saveBookMW');

const logoutMW = require('../middlewares/logoutMW');
const loginMW = require('../middlewares/loginMW');
const renderMW = require('../middlewares/renderMW');
const authMW = require('../middlewares/authMW');

const loadUsersMW = require('../middlewares/loadUsersMW');
const loadUserMW = require('../middlewares/loadUserMW');
const saveUserMW = require('../middlewares/saveUserMW');
const deleteUserMW = require('../middlewares/deleteUserMW');

// TODO RENDERHEZ VIEW

function subscibeToRoutes(app) {
    const objRepo = {};
    app.get('/', loadBooksMW(objRepo), renderMW(objRepo,'index'));
    app.get('/book/new', authMW(objRepo), renderMW(objRepo,'edit_book'));
    app.post('/book/new', authMW(objRepo), saveBookMW(objRepo));
    app.get('/book/edit/:bookid', authMW(objRepo), loadBookMW(objRepo), renderMW(objRepo,'edit_book'));
    app.post('/book/edit/:bookid', authMW(objRepo), saveBookMW(objRepo));
    app.get('/book/del/:bookid', authMW(objRepo), loadBookMW(objRepo), deleteBookMW(objRepo));

    app.get('/users', loadUsersMW(objRepo), renderMW(objRepo,'manage_users'));
    app.get('/user/new', authMW(objRepo), renderMW(objRepo,'add_user'));
    app.post('/user/new', authMW(objRepo), saveUserMW(objRepo));
    app.get('/user/edit/:userid', authMW(objRepo), loadUserMW(objRepo), renderMW(objRepo,'add_user'));
    app.post('/user/edit/:userid', authMW(objRepo), saveUserMW(objRepo));
    app.get('/user/del/:userid', authMW(objRepo), loadUserMW(objRepo), deleteUserMW(objRepo));

    app.get('/login', renderMW(objRepo,'login'));
    app.post('/login', loginMW(objRepo));
    app.get('/logout', logoutMW(objRepo));
}

module.exports = subscibeToRoutes;