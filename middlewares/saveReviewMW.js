/**
 * Save a review to a book
 * @param {object} objRepo
 */
module.exports = (objRepo) => {
    const ReviewModel = objRepo.ReviewModel;
    const BookModel = objRepo.BookModel;
    
    return (req, res, next) => {
        // Check if book exists in res.locals
        if (!res.locals.book) {
            return res.redirect('/browse');
        }
        
        // Check if we have the required fields for a review
        if (req.method !== 'POST' || 
            typeof req.body.reviewContent === 'undefined' || 
            typeof req.body.reviewRating === 'undefined') {
            return next();
        }
        
        // Check if the user has already reviewed this book
        return ReviewModel.findOne({ 
            book: res.locals.book._id, 
            user: req.session.userId 
        })
        .then(existingReview => {
            if (existingReview) {
                // User already has a review for this book
                res.locals.error = 'You have already reviewed this book.';
                return next();
            }
            
            // Create a new review
            const review = new ReviewModel({
                book: res.locals.book._id,
                user: req.session.userId,
                review_text: req.body.reviewContent,
                rating: parseInt(req.body.reviewRating),
                createdAt: new Date()
            });
            
            // Save the review
            return review.save()
                .then(savedReview => {
                    // Add the review to the book's reviews array
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