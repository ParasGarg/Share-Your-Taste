const shareController = require('./shares');
const needsController = require('./needs');
const usersController = require('./users');

let constructorMethod = (app) => {
    app.use("/shares", shareController);
    app.use("/needs", needsController);
    app.use("/users", usersController);
};

module.exports = {
    shares: require("./shares"),
    needs: require("./needs"),
    users: require("./users")
};