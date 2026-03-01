const https = require("https");

// Geocode location using Nominatim (free API, no key needed)
const geocodeLocation = (location, country) => {
    return new Promise((resolve, reject) => {
        const query = `${location}, ${country}`;
        const encodedQuery = encodeURIComponent(query);
        
        const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=1`;
        
        https.get(url, { headers: { 'User-Agent': 'WanderLust-App' } }, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const results = JSON.parse(data);
                    
                    if (results && results.length > 0) {
                        const result = results[0];
                        resolve({
                            latitude: parseFloat(result.lat),
                            longitude: parseFloat(result.lon)
                        });
                    } else {
                        // Default fallback coordinates
                        console.log("Could not geocode location, using default");
                        resolve({
                            latitude: 20.5937,
                            longitude: 78.9629
                        });
                    }
                } catch (error) {
                    console.log("Geocoding error:", error);
                    resolve({
                        latitude: 20.5937,
                        longitude: 78.9629
                    });
                }
            });
        }).on('error', (error) => {
            console.log("Geocoding request error:", error);
            resolve({
                latitude: 20.5937,
                longitude: 78.9629
            });
        });
    });
};

module.exports = { geocodeLocation };
