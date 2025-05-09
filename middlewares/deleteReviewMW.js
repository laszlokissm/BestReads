/**
 * Delete a review from the database
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const ReviewModel = objRepo.ReviewModel;
    const BookModel = objRepo.BookModel;
    return (req, res, next) => {
        if (!req.params.reviewId) {
            return res.redirect('/');
        }
        return ReviewModel.findById(req.params.reviewId)
            .then(review => {
                if (!review) {
                    return res.redirect('/');
                }
                if (review.user.toString() !== req.session.userId) {
                    return res.redirect('/');
                }
                const bookId = review.book;
                return BookModel.findById(review.book)
                    .then(book => {
                        if (book) {
                            book._reviews = book._reviews.filter(
                                reviewId => reviewId.toString() !== req.params.reviewId
                            );
                            return book.save();
                        }
                        return null;
                    })
                    .then(() => {
                        return review.deleteOne();
                    })
                    .then(() => {
                        return res.redirect(`/browse/${bookId}`);
                    });
            })
            .catch(err => {
                return next(err);
            });
    };
};