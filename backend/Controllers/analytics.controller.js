const ClickEvent = require("../Models/click.model");

// Get Total Clicks
exports.getTotalClicks = async (req, res) => {
    try {
        const totalClicksOnLinks = await ClickEvent.countDocuments({ type: "social", userId: req.user.id });
        const totalClicksOnShop = await ClickEvent.countDocuments({ type: "shop", userId: req.user.id });
        const totalCTAClicks = await ClickEvent.countDocuments({ type: "cta", userId: req.user.id });

        res.status(200).json({ totalClicksOnLinks, totalClicksOnShop, totalCTAClicks });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//Get Clicks Over Time (Last 12 Months)
exports.getClicksOverTime = async (req, res) => {
    try {
        // ✅ Generate last 6 months correctly
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setUTCMonth(date.getUTCMonth() - i, 1); // ✅ Ensure UTC month
            date.setUTCHours(0, 0, 0, 0);
            return {
                month: date.toLocaleString("en-US", { month: "short" }), // Example: "Feb"
                year: date.getUTCFullYear(),
                monthIndex: date.getUTCMonth() + 1, // ✅ Convert to 1-based index
            };
        }).reverse();

        console.log("Expected last 6 months:", last6Months); // Debugging

        // ✅ Fetch click data from MongoDB
        const clickData = await ClickEvent.aggregate([
            {
                $match: {
                    userId: req.user.id, // ✅ Ensure correct user
                    timestamp: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) } // ✅ Last 6 months only
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$timestamp" }, // ✅ MongoDB month is 1-based
                        year: { $year: "$timestamp" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } } // ✅ Ensure sorted order
        ]);

        console.log("Raw MongoDB Aggregation Output:", clickData); // Debugging

        // ✅ Ensure all months are included
        const formattedData = last6Months.map(({ month, year, monthIndex }) => {
            const match = clickData.find(
                (c) => c._id.month === monthIndex && c._id.year === year
            );
            return { month, year, count: match ? match.count : 0 };
        });

        console.log("Final Data to Send:", formattedData); // Debugging

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error in getClicksOverTime:", error);
        res.status(500).json({ message: "Server error" });
    }
};




// Get Traffic by Device
exports.getTrafficByDevice = async (req, res) => {
    try {
        console.log(req.user.id)
        const clicks = await ClickEvent.find({ userId: req.user.id });
        console.log(clicks);
        const trafficByDevice = await ClickEvent.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: "$deviceType", count: { $sum: 1 } } },
        ]);
        console.log(trafficByDevice)
        res.status(200).json(trafficByDevice);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Clicks by Site
exports.getClicksBySite = async (req, res) => {
    try {
      
        const clicksBySite = await ClickEvent.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: "$platform", count: { $sum: 1 } } },
        ]);
        res.status(200).json(clicksBySite);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Traffic by Individual Links
exports.getTrafficByLinks = async (req, res) => {
    try {
        const trafficByLinks = await ClickEvent.aggregate([
            { $match: { userId: req.user.id } },
            { $group: { _id: "$linkId", count: { $sum: 1 } } },
            { $lookup: { from: "links", localField: "_id", foreignField: "_id", as: "link" } },
            { $unwind: "$link" },
            { $project: { linkTitle: "$link.title", count: 1 } },
        ]);
        res.status(200).json(trafficByLinks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
