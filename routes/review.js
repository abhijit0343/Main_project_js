const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/Wrapasync");
const ExpressError = require("../utils/Expresserror");
const Review = require("../MODELS/review");
const Listing = require("../MODELS/listing");
const { reviewSchema } = require("../schema.js");

// ---- Validation Middleware ----
const validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// ---- Auth Middleware ----
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    res.redirect("/login");
};

// ---- Review Author Middleware ----
const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

const reviewsController = require("../controllers/reviews");

// Create review — login required
router.post("/", isLoggedIn, validatereview, wrapAsync(reviewsController.createReview));

// Delete review — login required + author only
router.delete("/:reviewId", isLoggedIn, wrapAsync(isReviewAuthor), wrapAsync(reviewsController.destroyReview));

module.exports = router;
