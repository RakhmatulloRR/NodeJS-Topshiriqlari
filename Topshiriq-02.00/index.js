"use strict";
//* # 46.dars: Topshiriq-02 [url: "http://MaktabDarsliklari.com/api/sinflar" ] ni tartibga keltirish: 

const express = require('express');
const logger39 = require('./middleware/logger39');
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config');
const sinflar = require('./routers/sinflar');
const home = require('./routers/home');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(logger39.fLog);
app.use(logger39.fAutent);
app.use(helmet());
app.use("/api/sinflar", sinflar.router);
app.use("/", home.router);

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan ishlayapdi...");
}
app.set("view engine", "pug");

console.log(process.env.NODE_ENV);
console.log(app.get("env"));
console.log(config.get("name"));
console.log(config.get("mailserver.host"));
//console.log(config.get("mailserver.password"));


const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`${port}-portni eshitishni boshladim...`);
});










