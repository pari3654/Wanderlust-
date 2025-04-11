const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utility/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner , validateListing , validateReview} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer') // for image upload
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



//index and create route
router.route("/")
.get( wrapAsync ( listingController.index ))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync ( listingController.createListing)
);



//new route
router.get("/new" , isLoggedIn, listingController.renderNewform );

//show update delete route
router.route("/:id")
.get(
    wrapAsync ( listingController.showListing )
)
.put(
    isLoggedIn, 
    isOwner,
    upload.single('listing[image]'),
     validateListing,
      wrapAsync ( listingController.editListing)
    )
.delete(isLoggedIn, isOwner, wrapAsync ( listingController.destroyListing) );
      
 //edit route 
router.get("/:id/edit",
    isLoggedIn ,
    isOwner, 
     wrapAsync( listingController.renderEditform )
   );
    
module.exports = router;
    