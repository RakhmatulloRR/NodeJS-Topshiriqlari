"use strick";
// FOYDALI LINK:
// https://www.youtube.com/watch?v=Vs4OD8lNm80
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/* const categories = [
    {id: 1, name: "HTML Tutorial"},
    {id: 2, name: "CSS Tutorial"},
    {id: 3, name: "JavaScript Tutorial"},
    {id: 4, name: "NodeJS Tutorial"},
    {id: 5, name: "MongoDB Tutorial"}
]; */
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 //& ---- DataBase ----
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Category = new mongoose.model("Category", categorySchema);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//& ---- get (Read All categories) ----
/* 
router.get("/", function(req, res) {
    res.send(categories);
}); 
*/ 
router.get("/", async function(req, res) {
    const categories = await Category.find().sort("name");
    res.send(categories);
});

function validateName(name) {
    const nameScheem = Joi.object({
        name: Joi.string().min(2).required()
    });
    return nameScheem.validate(name);
}
//& ---- POST (Create) ----
/* 
router.post("/", function(req, res) {
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
*/
router.post("/", async function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let category = new Category({
        name: req.body.name
    });
    category = await category.save();
    res.status(201).send(category);
});
//& ---- GET (Read) ----
/* 
router.get("/:id", function(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    res.status(200).send(category);
}); 
*/
router.get("/:id", async function(req, res) {
    try {
    const category = await Category.findById(req.params.id);
    return res.status(200).send(category);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- PUT (Update) ----
/* 
router.put("/:id", function(req, res) {
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
*/
router.put("/:id", async function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}); 
        return res.status(200).send(category);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- DELETE (Delete) ----
/* 
router.delete("/:id", function(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.status(200).send(category);
}); 
*/
router.delete("/:id", async function(req, res) {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        res.status(200).send(category);
    } catch (error) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
// //& ---- DELETE (Delete All) ----
// router.delete("/", function(req, res) {
//     const categorylength = categories.length;
//     categories.splice(0, categorylength);
//     res.status(200).send(categories);
// });
router.delete("/", async function(req, res) {
    try {
        const categories = await Category.remove();
        res.status(200).send(categories);
    } catch (error) {
        res.send("error");
    }
});

module.exports.router = router;

