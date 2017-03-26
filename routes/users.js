const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const usersController = controllers.users;


// route for getting user item by id
router.get("/id/:id", (req, res) => {
    usersController.getUserById(req.params.id).then((userDetails) => {
        res.json(userDetails);
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});


// route for posting new user
router.post("/new", (req, res) => {
    let newUser = req.body;

    if (!newUser) {
        res.status(400).json({ error: "No data provided for user." });
        return;
    }

    // checking name
    if (!newUser.name) {
        res.status(400).json({ error: "No name provided." });
        return;
    }

    // checking email
    if (!newUser.email) {
        res.status(400).json({ error: "No email provided." });
        return;
    }

    // checking mobile
    if (!newUser.mobile) {
        res.status(400).json({ error: "No mobile provided." });
        return;
    }

    // checking image
    if (!newUser.image) {
        newuser.image = "";
    }

    // checking bio
    if (!newUser.bio) {
        newuser.bio = "";
    }

    // checking drop address
    if (!newUser.street || !newUser.apt || !newUser.city || !newUser.state || !newUser.zip) {
        res.status(400).json({ error: "Address is not provided completely." });
        return;
    }

    // checking privacy category
    if (!newUser.privacyStatus) {
        res.status(400).json({ error: "No privacy status provided." });
        return;
    }
/*
usersController.getUserValidStatus(userUpdates.email).then((flag) => {
        console.log(flag);
    });
*/
    // creating new user
    usersController.createUser(newUser.name, newUser.email, newUser.mobile, newUser.image, newUser.bio, newUser.street, newUser.apt, newUser.city, newUser.state, newUser.zip, newUser.privacyStatus)
        .then((newUserItem) => {

            // validating user id
            if (!newUserItem) {
                return `Something went wrong`;
            }

            // created message
            console.log("New user is added!");
            res.json(newUserItem);

        }, (err) => {
            res.status(500).json({ error: err });
        });
});

// route for putting user value
router.put("/id/:id", (req, res) => {
    let userUpdates = req.body;

    // checking for empty json
    if (Object.keys(userUpdates).length === 0) {
        res.status(400).json({ error: "Nothing to update" });
        return;
    }

    usersController.getUserById(req.params.id).then(() => {
        usersController.updateUser(req.params.id, userUpdates).then((userUpdated) => {
            res.json(userUpdated);
        }, (err) => {
            res.status(500).json({ error: err });
        });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});

// route for disabling putting user value
router.put("/deactivate/:id", (req, res) => {
    usersController.getUserById(req.params.id).then(() => {
        usersController.disableUser(req.params.id).then((userUpdated) => {
            res.json(userUpdated);
        }, (err) => {
            res.status(500).json({ error: err });
        });
    }).catch((err) => {
        res.status(404).json({ error: err });
    });
});


module.exports = router;