"use strick";
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const sinflar = [
    {id: 1, name: "1-sinf"},
    {id: 2, name: "2-sinf"},
    {id: 3, name: "3-sinf"},
    {id: 4, name: "4-sinf"},
    {id: 5, name: "4-sinf"}
];
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const express = require('express');
const Joi = require('joi');
const router = express.Router();

//& ---- get (Read All sinflar) ----
router.get("/", function(req, res) {
    res.send(sinflar);
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
        id: sinflar.length + 1,
        name: req.body.name
    };
    sinflar.push(sinf);
    res.status(201).send(sinf);
});
//& ---- GET (Read) ----
router.get("/:id", function(req, res) {
    const sinf = sinflar.find(c => c.id === parseInt(req.params.id));
    if (!sinf) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    res.status(200).send(sinf);
});
//& ---- PUT (Update) ----
router.put("/:id", function(req, res) {
    const sinf = sinflar.find(c => c.id === parseInt(req.params.id));
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
    const sinf = sinflar.find(c => c.id === parseInt(req.params.id));
    if (!sinf) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const sinfIndex = sinflar.indexOf(sinf);
    sinflar.splice(sinfIndex, 1);
    res.status(200).send(sinf);
});
// //& ---- DELETE (Delete All) ----
// router.delete("/", function(req, res) {
//     const sinflength = sinflar.length;
//     sinflar.splice(0, sinflength);
//     res.status(200).send(sinflar);
// });

module.exports.router = router;

