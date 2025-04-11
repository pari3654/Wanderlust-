const express = require("express");
const router = express.Router( {mergeParams : true});
const wrapAsync = require("../utility/wrapAsync.js");
const ExpressError = require("../utility/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const { createReview } = require("../controllers/reviews.js");

const reviewController = require("../controllers/reviews.js")

//Reviews
// post review route
router.post("/",
    isLoggedIn,
    validateReview,
     wrapAsync( reviewController.createReview)
);

//review delete route
router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthor,
     wrapAsync ( reviewController.deleteReview)  
);

module.exports = router;