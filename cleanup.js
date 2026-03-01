const mongoose = require("mongoose");
const Listing = require("./MODELS/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(async () => {
    console.log("Connected to MongoDB");

    // Delete listings with no image or empty image URL
    const result = await Listing.deleteMany({
        $or: [
            { "image.url": { $exists: false } },
            { "image.url": "" },
            { "image.url": null },
            { image: { $exists: false } }
        ]
    });
    
    console.log(`Deleted ${result.deletedCount} listings with missing/empty images`);

    mongoose.connection.close();
    console.log("Cleanup complete. Connection closed.");
}).catch((err) => {
    console.log("Error:", err);
});
