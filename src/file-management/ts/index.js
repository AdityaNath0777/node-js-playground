"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var util = require("node:util");
var filePath = "./src/file/hello.txt";
function closeFile(fd) {
    var close = util.promisify(fs.close);
    close(fd)
        .then(function (data) {
        console.log("File closed successfully with fd: ".concat(fd));
        // as fs.close returns nothing, data will be undefined
        console.log("data: ", data); // undefined;
    })
        .catch(function (err) { return console.error(err); });
}
function readFile(filePath) {
    // async by default but w/o promise
    fs.open(filePath, "r", function (err, fd) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("fd: ", fd);
        closeFile(fd);
    });
}
readFile(filePath);
