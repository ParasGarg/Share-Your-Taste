const express = require("express");
const static = express.static(__dirname + '/public');

let app = express();

app.use("/public", static);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/ui/index.html');
})

app.get('/need/', function (req, res) {
    res.sendFile(__dirname + '/ui/need/list.html');
})

app.get('/need/1', function (req, res) {
    res.sendFile(__dirname + '/ui/need/item.html');
})

app.get('/share/', function (req, res) {
    res.sendFile(__dirname + '/ui/share/share-item.html');
})

app.get('/error/', function (req, res) {
    res.sendFile(__dirname + '/ui/error.html');
})

app.post('/share', function (req, res) {
    console.log(req);
})

app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});
