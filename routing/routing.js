const loadBooksMW = require('../middlewares/loadBooksMW');
const loadBookMW = require('../middlewares/loadBookMW');
const deleteBookMW = require('../middlewares/deleteBookMW');
const saveBookMW = require('../middlewares/saveBookMW');

const logoutMW = require('../middlewares/logoutMW');
const loginMW = require('../middlewares/loginMW');
const registerMW = require('../middlewares/registerMW')
const renderMW = require('../middlewares/renderMW');
const authMW = require('../middlewares/authMW');

const loadUsersMW = require('../middlewares/loadUsersMW');
const loadUserMW = require('../middlewares/loadUserMW');
const saveUserMW = require('../middlewares/saveUserMW');
const deleteUserMW = require('../middlewares/deleteUserMW');



const BookModel = require('../models/book');

//desgin
function subscibeToRoutes(app) {
    const objRepo = {BookModel: BookModel};
    // / oldalon a userhez tartozo konyvek listazasa
    app.get('/',  authMW(objRepo), loadUserMW(objRepo), loadBooksMW(objRepo), renderMW(objRepo,'index'));

    // ezek az admin felulethez tartozo manage books 
    app.use('/book/new', authMW(objRepo), saveBookMW(objRepo), renderMW(objRepo,'edit_book'));
    //app.post('/book/new', authMW(objRepo), saveBookMW(objRepo));
    app.use('/book/edit/:bookid', authMW(objRepo), loadBookMW(objRepo), saveBookMW(objRepo), renderMW(objRepo,'edit_book'));
    //app.post('/book/edit/:bookid', authMW(objRepo), saveBookMW(objRepo));
    app.get('/book/del/:bookid', authMW(objRepo), loadBookMW(objRepo), deleteBookMW(objRepo));
    app.get('/manage_books', authMW(objRepo), loadBooksMW(objRepo), renderMW(objRepo,'manage_books'));

    // manage users
    app.get('/users', loadUsersMW(objRepo), renderMW(objRepo,'manage_users'));
    app.get('/user/new', authMW(objRepo), renderMW(objRepo,'add_user'));
    app.post('/user/new', authMW(objRepo), saveUserMW(objRepo));
    app.get('/user/edit/:userid', authMW(objRepo), loadUserMW(objRepo), renderMW(objRepo,'add_user'));
    app.post('/user/edit/:userid', authMW(objRepo), saveUserMW(objRepo));
    app.get('/user/del/:userid', authMW(objRepo), loadUserMW(objRepo), deleteUserMW(objRepo));

    // book browse
    app.get('/browse', authMW(objRepo), loadBooksMW(objRepo), renderMW(objRepo,'browse'));

    // book details
    app.get('/browse/:bookid', authMW(objRepo), loadBookMW(objRepo), renderMW(objRepo,'book_detail'));

    app.get('/login', renderMW(objRepo,'login'));
    app.post('/login', loginMW(objRepo));
    app.get('/logout', logoutMW(objRepo));

    app.get('/register', renderMW(objRepo,'register'));
    app.post('/register', registerMW(objRepo));

    app.use((err, req, res, next) => {
        console.log(err);
        console.log(err.stack);
        res.end('ajajaj!');
    });
}

module.exports = subscibeToRoutes;