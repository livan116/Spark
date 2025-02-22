db.clickevents.aggregate([
    {
        $match: {
            userId: ObjectId("your_user_id"),
            timestamp: { $gte: new ISODate("2023-09-01T00:00:00Z") } // Adjust date for testing
        }
    },
    {
        $group: {
            _id: {
                month: { $month: "$timestamp" },
                year: { $year: "$timestamp" }
            },
            count: { $sum: 1 }
        }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
]);

