const Listing = require("../MODELS/listing");
const ExpressError = require("../utils/Expresserror");

module.exports.index = async (req, res) => {
    let { q } = req.query;
    let allListings;
    if (q) {
        allListings = await Listing.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } },
            ],
        });
    } else {
        allListings = await Listing.find({});
    }
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    const individualListing = await Listing.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!individualListing) {
        req.flash("error", "Listing you are looking for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing: individualListing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file ? (req.file.secure_url || req.file.path || req.file.url) : "";
    let filename = req.file ? req.file.filename : "";

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    req.flash("success", "New Listing Created!");
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
            url: req.file.secure_url || req.file.path || req.file.url,
            filename: req.file.filename,
        };
    }


    await listing.save();
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
};
