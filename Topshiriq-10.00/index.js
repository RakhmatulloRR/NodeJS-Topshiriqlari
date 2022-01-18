"use strict";
//* # 63.dars: Topshiriq-04.00. categories array idagi ma'lumotlarni mongoDB ga o'tkazish
const express = require('express');
const logger39 = require('./middleware/logger39');
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config');
const categories = require('./routers/categories');
const courses = require('./routers/courses');
const customers = require('./routers/customers');
const enrollments = require('./routers/enrollments');
const home = require('./routers/home');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/virtualdars")
.then((result) => {
    console.log("mongoDB ga ulanish hosil qilindi...");
}).catch((err) => {
    console.log("mongoDB ga ulanish vaqtida hatolik yuz berdi...", err);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(logger39.fLog);
app.use(logger39.fAutent);
app.use(helmet());
app.use("/api/categories", categories.router);
app.use("/api/courses", courses.router);
app.use("/api/customers", customers.router);
app.use("/api/enrollments", enrollments.router);
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










