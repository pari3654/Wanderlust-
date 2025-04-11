const Listing = require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utility/ExpressError.js");



module.exports.isLoggedIn = (req, res, next) => {
if(!req.isAuthenticated()) //passport method
    {
        req.session.redirectUrl = req.originalUrl; // redirect url 
        req.flash("error", " you must be logged in to create listing!");
        return res.redirect("/login");
    }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if( req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();

};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
         let listing = await Listing.findById(id) // for authorization
         if(! listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error" , " You are not the owner of this listing");
            return  res.redirect(`/listings/${id}`);
         }
         next();
        };

 
 module.exports.validateListing = (req, res, next) => {
        // server side validations for listing
    let {error} = listingSchema.validate(req.body); //does req body satisfies the cond listedin schema
    if (error) { 
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


// server side validations for review
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body); //does req body satisfies the cond listedin schema
    
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};


module.exports.isreviewAuthor = async (req, res, next) => {
    let { id , reviewId } = req.params;
         let review = await Review.findById(reviewId) // for authorization
         if(! review.author.equals(res.locals.currUser._id)) {
            req.flash("error" , " You are not the author of this review");
            return  res.redirect(`/listings/${id}`);
         }
         next();
        };
