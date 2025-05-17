/**
 * Save a review to a book
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const ReviewModel = objRepo.ReviewModel;
    const BookModel = objRepo.BookModel;
    return (req, res, next) => {
        if (!res.locals.book) {
            return res.redirect('/browse');
        }
        if (req.method !== 'POST' || 
            typeof req.body.reviewContent === 'undefined' || 
            typeof req.body.reviewRating === 'undefined') {
            return next();
        }
        return ReviewModel.findOne({ 
            book: res.locals.book._id, 
            user: req.session.userId 
        })
        .then(existingReview => {
            if (existingReview) {
                res.locals.error = 'You have already reviewed this book.';
                return next();
            }
            const review = new ReviewModel({
                book: res.locals.book._id,
                user: req.session.userId,
                review_text: req.body.reviewContent,
                rating: parseInt(req.body.reviewRating),
                createdAt: new Date()
            });
            return review.save()
                .then(savedReview => {
                    res.locals.book._reviews.push(savedReview._id);
                    return res.locals.book.save();
                })
                .then(() => {
                    return res.redirect(`/browse/${res.locals.book._id}`);
                });
        })
        .catch(err => {
            return next(err);
        });
    };
};