const Listing = require("../MODELS/listing");
const ExpressError = require("../utils/Expresserror");

module.exports.index = async (req, res) => {
    console.log("Accessing /listings route...");
    const allListings = await Listing.find({});
    console.log("All listings retrieved:", allListings.length);
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    console.log("Accessing /listings/:id route...");
    const individualListing = await Listing.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } });
    if (!individualListing) {
        throw new ExpressError(404, "Listing not found!");
    }
    console.log("Listing retrieved:", individualListing);
    res.render("listings/show", { listing: individualListing });
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // assign owner

    if (typeof req.file !== "undefined") {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await newListing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const individualListing = await Listing.findById(req.params.id);
    if (!individualListing) {
        throw new ExpressError(404, "Listing not found!");
    }
    res.render("listings/edit", { listing: individualListing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }

    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
};
