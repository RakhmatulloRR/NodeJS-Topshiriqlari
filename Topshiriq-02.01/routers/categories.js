"use strick";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const categories = [
    {id: 1, name: "HTML Tutorial"},
    {id: 2, name: "CSS Tutorial"},
    {id: 3, name: "JavaScript Tutorial"},
    {id: 4, name: "NodeJS Tutorial"},
    {id: 5, name: "MongoDB Tutorial"}
];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const express = require('express');
const Joi = require('joi');
const router = express.Router();

//& ---- get (Read All categories) ----
router.get("/", function(req, res) {
    res.send(categories);
}); 
function validateName(name) {
    const nameScheem = Joi.object({
        name: Joi.string().min(2).required()
    });
    return nameScheem.validate(name);
}
//& ---- POST (Create) ----
router.post("/", function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const sinf = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(sinf);
    res.status(201).send(sinf);
});
//& ---- GET (Read) ----
router.get("/:id", function(req, res) {
    const sinf = categories.find(c => c.id === parseInt(req.params.id));
    if (!sinf) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    res.status(200).send(sinf);
});
//& ---- PUT (Update) ----
router.put("/:id", function(req, res) {
    const sinf = categories.find(c => c.id === parseInt(req.params.id));
    if (!sinf) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    sinf.name = req.body.name;
    res.status(200).send(sinf);
});
//& ---- DELETE (Delete) ----
router.delete("/:id", function(req, res) {
    const sinf = categories.find(c => c.id === parseInt(req.params.id));
    if (!sinf) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const sinfIndex = categories.indexOf(sinf);
    categories.splice(sinfIndex, 1);
    res.status(200).send(sinf);
});
// //& ---- DELETE (Delete All) ----
// router.delete("/", function(req, res) {
//     const sinflength = categories.length;
//     categories.splice(0, sinflength);
//     res.status(200).send(categories);
// });

module.exports.router = router;

