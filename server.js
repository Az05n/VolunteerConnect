// // Import required modules
// const express = require("express");
// const mongoose = require("./database"); // Import MongoDB connection
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors()); // Allow frontend to communicate with backend
// app.use(bodyParser.json()); // Parse JSON request bodies

// // Define Volunteer Schema
// const volunteerSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     message: { type: String, required: true }
// });

// // Create a Volunteer Model
// const Volunteer = mongoose.model("Volunteer", volunteerSchema);

// // API Endpoint: Register a new volunteer
// app.post("/volunteer", async (req, res) => {
//     try {
//         const { name, email, message } = req.body;

//         // Validate fields
//         if (!name || !email || !message) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Create a new volunteer record
//         const newVolunteer = new Volunteer({ name, email, message });

//         // Save to MongoDB
//         await newVolunteer.save();
//         res.status(201).json({ message: "Volunteer registered successfully!" });
//     } catch (error) {
//         console.error("Error saving volunteer:", error);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// });

// // API Endpoint: Fetch all volunteers
// app.get("/volunteers", async (req, res) => {
//     try {
//         const volunteers = await Volunteer.find();
//         res.json(volunteers);
//     } catch (error) {
//         console.error("Error fetching volunteers:", error);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const mongoose = require("./database"); // Import database connection
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(bodyParser.json()); // Parse JSON request bodies

// Volunteer Schema & Model
const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true }
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

// ✅ API Endpoint: Register a new volunteer
app.post("/volunteer", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newVolunteer = new Volunteer({ name, email, message });
        await newVolunteer.save();

        res.status(201).json({ message: "Volunteer registered successfully!" });
    } catch (error) {
        console.error("Error saving volunteer:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// ✅ API Endpoint: Fetch all registered volunteers
app.get("/volunteers", async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// ✅ API Endpoint: Delete a volunteer by email
app.delete("/volunteer/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const deletedVolunteer = await Volunteer.findOneAndDelete({ email });

        if (!deletedVolunteer) {
            return res.status(404).json({ message: "Volunteer not found!" });
        }

        res.status(200).json({ message: "Volunteer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
