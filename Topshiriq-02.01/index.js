"use strict";
//* # 46.dars: Topshiriq-02.01 [url: "http://virtualdars.com/api/categories" ] ni tartibga keltirish: 
const express = require('express');
const logger39 = require('./middleware/logger39');
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config');
const categories = require('./routers/categories');
const home = require('./routers/home');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(logger39.fLog);
app.use(logger39.fAutent);
app.use(helmet());
app.use("/api/categories", categories.router);
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










