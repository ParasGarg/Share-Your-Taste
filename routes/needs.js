const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const needsController = controllers.needs;

// route for getting share item by id
router.get("/", (req, res) => {
    needsController.getAllActiveShares().then((sharesList) => {
        res.json(sharesList);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for getting share item by id
router.get("/id/:id", (req, res) => {
    needsController.getShareById(req.params.id).then((shareItem) => {
        res.json(shareItem);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for getting share item by category
router.get("/category/:category", (req, res) => {
    needsController.getShareByCategory(req.params.category).then((shareItems) => {
        res.json(shareItems);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for getting share item by zip
router.get("/markers/:zip", (req, res) => {
    needsController.getShareByZip(req.params.zip).then((markerItems) => {
        res.json(markerItems);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for posting comment of specified share item
router.post("/comment/:shareId", (req, res) => {
    let newComment = req.body;

    if (Object.keys(newComment).length === 0) {     // checking comment variable for values
        res.status(400).json({ error: "No comment provided" });
        return;
    } else if (!newComment.email) {                // checking comment poster attribute
        res.status(400).json({ error: "No email provided" });
        return;
    } else if (!newComment.comment) {               // checking comment comment attribute
        res.status(400).json({ error: "No comment content provided" });
        return;
    }

    needsController.createComment(req.params.shareId, newComment).then((addComment) => {
        res.json(addComment);
    }, (err) => {
        res.status(404).json({ error: err });
    });
})


module.exports = router;