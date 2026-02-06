const mongoose = require("mongoose");
const Listing = require("./MODELS/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(async () => {
    console.log("Connected to MongoDB for seeding");

    // Clear existing listings if any
    await Listing.deleteMany({});

    const sampleListing = new Listing({
        title: "Cozy Beachfront Villa",
        description: "Escape to this beautiful villa with stunning ocean views.",
        image: "https://images.unsplash.com/photo-15423148 forward/4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 2500,
        location: "Malibu",
        country: "United States",
    });

    await sampleListing.save();
    console.log("Sample listing saved successfully to the database!");

    mongoose.connection.close();
}).catch((err) => {
    console.log("Error seeding database:", err);
});
