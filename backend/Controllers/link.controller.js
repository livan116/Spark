const Link = require('../Models/links.model')

// ✅ Add a new link (Social or Shop)
exports.addLink = async (req, res) => {
    try {
        let { type, title, url, platform } = req.body;

        // Default type is "social" if not provided
        if (!type) {
            type = "social";
        }

        if (!title || !url || !platform) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLink = new Link({
            user: req.user.id,
            type,
            title,
            url,
            platform,
        });

        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// ✅ Get all links for logged-in user
exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Update a link
exports.updateLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, url, platform } = req.body;
        link.title = title || link.title;
        link.url = url || link.url;
        link.platform = platform || link.platform;

        await link.save();
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        // Find link by ID
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        // Ensure the logged-in user owns the link
        console.log(link.user.toString())
        console.log(req.user.id)
        if (link.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete the link
        await Link.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
