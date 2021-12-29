//* # 36.dars: Topshiriq-01 [url: "http://webtutorial.com/api/categories" ]
//* postman da url: "http://localhost:5000/api/categories"
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const categories = [
    {id: 1, name: "HTML"},
    {id: 2, name: "CSS"},
    {id: 3, name: "SASS"},
    {id: 4, name: "JavaScript"},
    {id: 5, name: "NodeJS"}
];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const express = require('express');
const Joi = require('joi');
const logger39 = require('./middleware/logger39');
const helmet = require("helmet");
const morgan = require('morgan');
const config = require('config');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(logger39.fLog);
app.use(logger39.fAutent);
app.use(helmet());
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

//& ---- get (Read root) ----
app.get("/", function(req, res) {
    res.render("index", {myTitle:"this is pug file", myH1:"Assalomu alaykum"});
});

//& ---- get (Read All Categories) ----
app.get("/api/categories", function(req, res) {
    res.send(categories);
}); 
function validateName(name) {
    const nameScheem = Joi.object({
        name: Joi.string().min(2).required()
    });
    return nameScheem.validate(name);
}
//& ---- POST (Create) ----
app.post("/api/categories", function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.status(201).send(category);
});
//& ---- GET (Read) ----
app.get("/api/categories/:id", function(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    res.status(200).send(category);
});
//& ---- PUT (Update) ----
app.put("/api/categories/:id", function(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    category.name = req.body.name;
    res.status(200).send(category);
});
//& ---- DELETE (Delete) ----
app.delete("/api/categories/:id", function(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.status(200).send(category);
});
// //& ---- DELETE (Delete All) ----
// app.delete("/api/categories", function(req, res) {
//     const categorylength = categories.length;
//     categories.splice(0, categorylength);
//     res.status(200).send(categories);
// });

const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`${port}-portni eshitishni boshladim...`);
}); 
