const Link = require('../Models/links.model')
const ClickEvent = require('../Models/click.model')

// Add a new link (Social or Shop)
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


// Get all links for logged-in user
exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update a link
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


// Redirect and track clicks
// Handle Link Click and Track Analytics

exports.handleRedirect = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        // Capture device info from headers
        const userAgent = req.headers["user-agent"]?.toLowerCase() || "";
        let deviceType = "Other";
        if (userAgent.includes("windows")) deviceType = "Windows";
        else if (userAgent.includes("mac")) deviceType = "Mac";
        else if (userAgent.includes("linux")) deviceType = "Linux";
        else if (userAgent.includes("android")) deviceType = "Android";
        else if (userAgent.includes("iphone") || userAgent.includes("ipad")) deviceType = "iOS";

        // Determine if it's a shop, CTA, or regular link
        let type;
        if (link.type === "shop") {
            type = "shop";
        } else if (link.type === "cta") {
            type = "cta";
        } else {
            type = "social"; // Default to "link" instead of "social" (fixing schema mismatch)
        }

        // Determine platform (YouTube, Instagram, etc.) based on link URL
        let platform = "Other";
        const url = link.url.toLowerCase();
        if (url.includes("youtube.com")) platform = "YouTube";
        else if (url.includes("instagram.com")) platform = "Instagram";
        else if (url.includes("facebook.com")) platform = "Facebook";
        else if (url.includes("x.com")) platform = "X";

        // ✅ Fix: Ensure timestamp is correctly stored
        await ClickEvent.create({
            userId: req.user.id,
            linkId: link._id,
            type,
            deviceType,
            platform,
            timestamp: new Date(), // Ensure timestamp is saved
        });

        // Redirect user to the actual link
        res.redirect(link.url);
    } catch (error) {
        console.error("Error in handleRedirect:", error);
        res.status(500).json({ message: "Server error" });
    }
};




