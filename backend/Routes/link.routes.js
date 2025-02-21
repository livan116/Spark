
const express = require('express')
const { addLink, getLinks, updateLink, deleteLink }  = require('../Controllers/link.controller.js');
const auth = require('../Middleware/auth.middleware');

const router = express.Router();

// Create a new link
router.post("/", auth, addLink);

// Get all links for a user
router.get("/", auth, getLinks);

// Update a link
router.put("/:id", auth, updateLink);

// Delete a link
router.delete("/:id", auth, deleteLink);

module.exports = router;
