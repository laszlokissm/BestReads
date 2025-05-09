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
        
        // Find the review
        return ReviewModel.findById(req.params.reviewId)
            .then(review => {
                if (!review) {
                    return res.redirect('/');
                }
                
                // Check if the current user is the author of the review
                if (review.user.toString() !== req.session.userId) {
                    return res.redirect('/');
                }
                
                // Store book ID for redirecting after deletion
                const bookId = review.book;
                
                // Remove the review reference from the book
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
                        // Delete the review itself
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