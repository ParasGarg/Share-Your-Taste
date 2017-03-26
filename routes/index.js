const sharesRoutes = require("./shares");
const needsRoutes = require("./needs");
const usersRoutes = require("./users");

const constructorMethod = (app) => {
    // routing
    app.use("/share", sharesRoutes);
    app.use("/needs", needsRoutes);
    app.use("/users", usersRoutes);

    // root page checking
    app.use("/$/", (req, res) => {
        res.status(200).send("This is the Root Page of http://localhost:3000");
    })

    // error checking
    app.use("*", (req, res) => {
        res.status(404).send("Error 404. Page Not Found");
    });
};

module.exports = constructorMethod;