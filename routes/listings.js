const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/Wrapasync");
const ExpressError = require("../utils/Expresserror");
const Listing = require("../MODELS/listing");
const { listingSchema } = require("../schema.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const cloudinary = require("cloudinary");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
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
    req.session.redirectUrl = req.originalUrl; // save intended destination
    req.flash("error", "You must be logged in first!");
    res.redirect("/login");
};

// ---- Owner Middleware ----
const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

const listingsController = require("../controllers/listings");

router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

router.route("/:id")
    .get(wrapAsync(listingsController.showListing))
    .put(isLoggedIn, wrapAsync(isOwner), validateListing, wrapAsync(listingsController.updateListing))
    .delete(isLoggedIn, wrapAsync(isOwner), wrapAsync(listingsController.destroyListing));

//index route
router.get("/", wrapAsync(listingsController.index));

//new route — login required
router.get("/new", isLoggedIn, listingsController.renderNewForm);

//show route 
router.get("/:id", wrapAsync(listingsController.showListing));

//Create Route — login required
router.post("/", isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

//edit route — login required + owner only
router.get("/:id/edit", isLoggedIn, wrapAsync(isOwner), wrapAsync(listingsController.renderEditForm));

//Update Route — login required + owner only
router.put("/:id", isLoggedIn, wrapAsync(isOwner), validateListing, wrapAsync(listingsController.updateListing));

//delete route — login required + owner only
router.delete("/:id", isLoggedIn, wrapAsync(isOwner), wrapAsync(listingsController.destroyListing));

module.exports = router;
