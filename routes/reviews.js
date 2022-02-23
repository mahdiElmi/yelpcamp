const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


const router = express.Router({ mergeParams: true });


router.post("/", isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete("/:reviewId", isReviewAuthor, isLoggedIn, catchAsync(reviewController.deleteReview))


module.exports = router;