"use strick";
// FOYDALI LINK:
// https://www.youtube.com/watch?v=Vs4OD8lNm80

const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const {Course, validateCourse} = require('../models/course');




//& ---- get (Read All courses) ----
router.get("/", async function (req, res) {
    const courses = await Course.find().sort("name");
    res.send(courses);
});


//& ---- POST (Create) ----
router.post("/", async function (req, res) {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const category = new Category.findById(req.body.categoryId);
    if (!category) {
        return res.status(404).send("Berilgan ID li category topilmadi");
    }


    let course = new Course({
        title: req.body.title,
        category: {
            _id: req.body.categoryId,
            name: category.name,
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status,
    });
    course = await course.save();
    res.status(201).send(course);
});
//& ---- GET (Read) ----
router.get("/:id", async function (req, res) {
    try {
        const course = await Course.findById(req.params.id);
        return res.status(200).send(course);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- PUT (Update) ----
router.put("/:id", async function (req, res) {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const category = new Category.findById(req.body.categoryId);
    if (!category) {
        return res.status(404).send("Berilgan ID li category topilmadi");
    }
    try {
        let course = await Course.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            category: {
                _id: req.body.categoryId,
                name: category.name,
            },
            trainer: req.body.trainer,
            tags: req.body.tags,
            status: req.body.status,
        }, {new: true});
        return res.status(200).send(course);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- DELETE (Delete) ----
router.delete("/:id", async function (req, res) {
    try {
        const course = await Course.findByIdAndRemove(req.params.id);
        res.status(200).send(course);
    } catch (error) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
// //& ---- DELETE (Delete All) ----
router.delete("/", async function (req, res) {
    try {
        const courses = await Course.remove();
        res.status(200).send(courses);
    } catch (error) {
        res.send("error");
    }
});

module.exports.router = router;