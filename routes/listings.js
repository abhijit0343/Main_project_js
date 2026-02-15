const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/Wrapasync");
const ExpressError = require("../utils/Expresserror");
const Listing = require("../MODELS/listing");
const { listingSchema } = require("../schema.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//index route
router.get("/", wrapAsync(async (req, res) => {
    console.log("Accessing /listings route...");
    const allListings = await Listing.find({});
    console.log("All listings retrieved:", allListings.length);
    res.render("listings/index", { allListings });
}));

//new route
router.get("/new", (req, res) => {
    res.render("listings/new");
})

//show route 
router.get("/:id", wrapAsync(async (req, res) => {
    console.log("Accessing /listings/:id route...");
    const individualListing = await Listing.findById(req.params.id).populate("reviews");
    if (!individualListing) {
        throw new ExpressError(404, "Listing not found!");
    }
    console.log("Listing retrieved:", individualListing);
    res.render("listings/show", { listing: individualListing });
}));

//Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "Listing created successfully!");
    req.flash("error", "Listing created failed!");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const individualListing = await Listing.findById(req.params.id);
    if (!individualListing) {
        throw new ExpressError(404, "Listing not found!");
    }
    res.render("listings/edit", { listing: individualListing });
}));

//Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;
