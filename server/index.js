var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require('fs');

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969;

server.listen(port, () => console.log("Server running in port " + port));

const data = [];
let rowData = [];
for (let i = 0; i <= 8; i++) {
  for (let j = 0; j <= 8; j++) {
    if (i % 2 === 1 && j % 2 === 1) {
      rowData.push({
        id: `${j}_${i}`,
        object: 'break_wall',
      })
    } else {
      rowData.push({
        id: `${j}_${i}`,
        object: j === 4 && i === 4 ? 'pikachu' : null
      })
    }
  }
  data.push(rowData);
  rowData = [];
};

io.on("connection", function(socket) {
  const dataServer = data;
  console.log(socket.id + ": connected");
  socket.on("disconnect", function() {
    console.log(socket.id + ": disconnected");
  });
  io.sockets.emit("getData", {dataBoard: dataServer});
  socket.on("updateData", data => {
    io.emit("sendData", {dataBoard: data.dataBoard})
  });

});

app.get("/", (req, res) => {
  res.send("Game on!!!");
});
