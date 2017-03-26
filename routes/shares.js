const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const sharesController = controllers.shares;


// route for getting share by id
router.get("/:id", (req, res) => {
    sharesController.getShareById(req.params.id).then((shareItem) => {
        res.json(shareItem);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for posting share
router.post("/", (req, res) => {
    let newShare = req.body;
    console.log(newShare);

    if (!newShare) {
        res.status(400).json({ error: "No data provided for share." });
        return;
    }

    // checking title
    if (!newShare.title) {
        res.status(400).json({ error: "No title provided." });
        return;
    }

    // checking description
    if (!newShare.description) {
        newShare.description = "";
    }

    // checking images
    if (!newShare.images) {
        newShare.images = [];
    }

    // checking food status
    if (!newShare.itemStatus) {
        res.status(400).json({ error: "No food status provided." });
        return;
    }

    // checking drop status
    if (!newShare.dropStatus) {
        res.status(400).json({ error: "No drop status provided." });
        return;
    }


    // checking drop address
    if (!newShare.dropStreet || !newShare.dropApt || !newShare.dropCity || !newShare.dropState || !newShare.dropZip) {
        res.status(400).json({ error: "No drop off address is not provided completely." });
        return;
    }

    // checking item category
    if (!newShare.itemCategory) {
        res.status(400).json({ error: "No drop off address provided." });
        return;
    } else if (newShare.itemCategory === "food") {

        // checking food cuisine
        if (!newShare.foodCuisine) {
            res.status(400).json({ error: "No food cuisine provided." });
            return;
        }

        // checking food cook date
        if (!newShare.foodCookDate) {
            res.status(400).json({ error: "No food cook date provided." });
            return;
        }

        // checking food best before date
        if (!newShare.foodBestBeforeDate) {
            res.status(400).json({ error: "No food best before date provided." });
            return;
        }

        // checking food ingredients
        if (!newShare.foodIngredients) {
            foodIngredients = [];
        }

        // declaring other category item values
        newShare.clothSize = "";
        newShare.clothGender = "";

    } else if (newShare.itemCategory === "clothes") {

        // checking cloth size
        if (!newShare.clothSize) {
            res.status(400).json({ error: "No cloth size provided." });
            return;
        }

        // checking cloth gender
        if (!newShare.foodCookDate) {
            res.status(400).json({ error: "No cloth gender provided." });
            return;
        }

        // declaring other category item values
        newShare.foodCuisine = "";
        newShare.foodCookDate = "";
        newShare.foodBestBeforeDate = "";
        newShare.foodIngredients = [];
    } else if (newShare.itemCategory === "books") {
        // declaring other category item values
        newShare.foodCuisine = "";
        newShare.foodCookDate = "";
        newShare.foodBestBeforeDate = "";
        newShare.foodIngredients = [];
        newShare.clothSize = "";
        newShare.clothGender = "";
    }

    // checking comments
    if (!newShare.comments) {
        newShare.comments = [];
    }

    // creating new share
    sharesController.createShare(newShare.title, newShare.description, newShare.images, newShare.itemStatus, newShare.dropStatus, newShare.dropStreet, newShare.dropApt, newShare.dropCity, newShare.dropState, newShare.dropZip, newShare.itemCategory, newShare.foodCuisine, newShare.foodCookDate, newShare.foodBestBeforeDate, newShare.foodIngredients, newShare.clothSize, newShare.clothGender, newShare.comments)
        .then((newShareItem) => {
            // validating share id
            if (!newShareItem) {
                return `Something went wrong`;
            }

            // created message
            console.log("New share is added!");
            res.json(newShareItem);

        }, (err) => {
            res.status(500).json({ error: err });
        });
});

// route for putting share value
router.put("/:id", (req, res) => {
    let shareUpdates = req.body;

    // checking for empty json
    if (Object.keys(shareUpdates).length === 0) {
        res.status(400).json({ error: "Nothing to update" });
        return;
    }

    sharesController.getShareById(req.params.id).then(() => {
        sharesController.updateShare(req.params.id, shareUpdates).then((shareUpdated) => {

            res.json(shareUpdated);
        }, (err) => {
            res.status(500).json({ error: err });
        });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for putting share value
router.put("/deactivate/:id", (req, res) => {
    sharesController.getShareById(req.params.id).then(() => {
        sharesController.disableShare(req.params.id).then((shareUpdated) => {
            res.json(shareUpdated);
        }, (err) => {
            res.status(500).json({ error: err });
        });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for deleting share
router.delete("/:id", (req, res) => {
    sharesController.getShareById(req.params.id).then(() => {
        sharesController.deleteShare(req.params.id).then(() => {
            res.status(200).send(`Share of id ${req.params.id} has been deleted`);
        }, (err) => {
            res.status(500).json({ error: err });
        });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

module.exports = router;
