const sharesRoutes = require("./shares");
const needsRoutes = require("./needs");
const usersRoutes = require("./users");

const constructorMethod = (app) => {
    // routing
    app.use("/api/share", sharesRoutes);
    app.use("/api/needs", needsRoutes);
    app.use("/users", usersRoutes);
    
    // root page checking
    app.use("/$/", (req, res) => {
        res.status(200).sendFile(__dirname + '/ui/index.html');
    })

    app.get('/needs/', function (req, res) {
        res.sendFile(__dirname + '/ui/need/list.html');
    })

    app.get('/needs/:id', function (req, res) {
        res.sendFile(__dirname + '/ui/need/item.html');
    })

    app.get('/share/', function (req, res) {
        res.sendFile(__dirname + '/ui/share/share-item.html');
    })

    // error checking
    app.use("*", (req, res) => {
        res.status(404).sendFile(__dirname + '/ui/error.html');
    });
};

module.exports = constructorMethod;
