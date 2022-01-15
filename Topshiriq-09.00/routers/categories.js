"use strick";
// FOYDALI LINK:
// https://www.youtube.com/watch?v=Vs4OD8lNm80

const express = require('express');
const router = express.Router();
const {Category, validateCatgory} = require('../models/category');





//& ---- get (Read All categories) ----
router.get("/", async function(req, res) {
    const categories = await Category.find().sort("name");
    res.send(categories);
});


//& ---- POST (Create) ----
router.post("/", async function(req, res) {
    const {error} = validateCatgory(req.body);
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
router.get("/:id", async function(req, res) {
    try {
    const category = await Category.findById(req.params.id);
    return res.status(200).send(category);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- PUT (Update) ----
router.put("/:id", async function(req, res) {
    const {error} = validateCatgory(req.body);
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
router.delete("/:id", async function(req, res) {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        res.status(200).send(category);
    } catch (error) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
// //& ---- DELETE (Delete All) ----
router.delete("/", async function(req, res) {
    try {
        const categories = await Category.remove();
        res.status(200).send(categories);
    } catch (error) {
        res.send("error");
    }
});

module.exports.router = router;

