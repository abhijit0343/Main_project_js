const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./MODELS/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})
//index route
app.get("/listings", async (req, res) => {
    console.log("Accessing /listings route...");
    const allListings = await Listing.find({});
    console.log("All listings retrieved:", allListings.length);
    res.render("listings/index", { allListings });
});

//Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});

//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
})

//show route 
app.get("/listings/:id", async (req, res) => {
    console.log("Accessing /listings/:id route...");
    const individualListing = await Listing.findById(req.params.id);
    console.log("Listing retrieved:", individualListing);
    res.render("listings/show", { listing: individualListing });
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    const individualListing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing: individualListing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// app.get("/testlisting", async (req, res) => {
//     try {
//         let sampletesting = new listing({
//             title: "Test Listing",
//             description: "Test Listing",
//             image: { url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
//             price: 1200,
//             location: "Calangute, Goa",
//             country: "India",
//         });
//         await sampletesting.save();
//         console.log("Sample listing saved successfully");
//         res.send("Sample listing created and saved to DB");
//     } catch (err) {
//         console.error("Error creating sample listing:", err);
//         res.status(500).send("Error creating sample listing");
//     }
// });

app.get("/", (req, res) => {
    res.send("Hi am root");
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
});