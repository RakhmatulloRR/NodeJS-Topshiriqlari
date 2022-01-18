"use strick";
// FOYDALI LINK:
// https://www.youtube.com/watch?v=Vs4OD8lNm80

const express = require('express');
const {Customer} = require('../models/customer');
const {Course} = require('../models/course');
const router = express.Router();
const {Enrollment, validateEnrollment} = require('../models/enrollment');




//& ---- get (Read All enrollments) ----
router.get("/", async function (req, res) {
    const enrollments = await Enrollment.find().sort("dateStart");
    res.send(enrollments);
});


//& ---- POST (Create) ----
router.post("/", async function (req, res) {
    const {error} = validateEnrollment(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(404).send("Berilgan ID li customer topilmadi");
    }
    const course = await Course.findById(req.body.courseId);
    if (!course) {
        return res.status(404).send("Berilgan ID li course topilmadi");
    }


    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name,
        },
        course: {
            _id: course._id,
            title: course.title,
        },
        courseFee: course.fee,
    });
    if (customer.isVip) {
        enrollment.courseFee = course.fee * 0.8; // Vip mijozga 20% chegirma
    }
    enrollment = await enrollment.save();
    customer.bonusPoint++;
    customer.save();
    res.status(201).send(enrollment);
});
//& ---- GET (Read) ----
router.get("/:id", async function (req, res) {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        return res.status(200).send(enrollment);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- PUT (Update) ----
router.put("/:id", async function (req, res) {
    const {error} = validateEnrollment(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(404).send("Berilgan ID li customer topilmadi");
    }
    const course = await Course.findById(req.body.courseId);
    if (!course) {
        return res.status(404).send("Berilgan ID li course topilmadi");
    }
    try {
        let enrollment = await Enrollment.findByIdAndUpdate(req.params.id, {
            customer: {
                _id: req.body.customerId,
                name: customer.name,
            },
            course: {
                _id: req.body.courseId,
                title: course.title,
            },
            courseFee: course.fee,
        }, {new: true});
        if (customer.isVip) {
            enrollment.courseFee = course.fee * 0.8;
        }
        customer.bonusPoint++;
        customer.save();
        return res.status(200).send(enrollment);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- DELETE (Delete) ----
router.delete("/:id", async function (req, res) {
    try {
        const enrollment = await Enrollment.findByIdAndRemove(req.params.id);
        res.status(200).send(enrollment);
    } catch (error) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
// //& ---- DELETE (Delete All) ----
router.delete("/", async function (req, res) {
    try {
        const enrollments = await Enrollment.remove();
        res.status(200).send(enrollments);
    } catch (error) {
        res.send("error");
    }
});

module.exports.router = router;