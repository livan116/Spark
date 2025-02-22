const express = require("express");
const router = express.Router();
const analyticsController = require("../Controllers/analytics.controller");
const auth = require("../Middleware/auth.middleware");

router.get("/total", auth, analyticsController.getTotalClicks);
router.get("/monthly", auth, analyticsController.getClicksOverTime);
router.get("/device", auth, analyticsController.getTrafficByDevice);
router.get("/sites", auth, analyticsController.getClicksBySite);
router.get("/links", auth, analyticsController.getTrafficByLinks);

module.exports = router;
