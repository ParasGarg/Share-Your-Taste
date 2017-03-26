const shareController = require('./shares');
const needsController = require('./needs');

let constructorMethod = (app) => {
    app.use("/shares", shareController);
    app.use("/needs", needsController);
};

module.exports = {
    shares: require("./shares"),
    needs: require("./needs")
};