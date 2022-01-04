"use strick";
// FOYDALI LINK:
// https://www.youtube.com/watch?v=Vs4OD8lNm80

const express = require('express');
const { boolean } = require('joi');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 //& ---- DataBase ----
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

});
const Customer = new mongoose.model("Customer", customerSchema);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//& ---- get (Read All customers) ----
router.get("/", async function(req, res) {
    const customers = await Customer.find().sort("name");
    res.send(customers);
});

function validateName(name) {
    const nameScheem = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()
    });
    return nameScheem.validate(name);
}
//& ---- POST (Create) ----
router.post("/", async function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.status(201).send(customer);
});
//& ---- GET (Read) ----
router.get("/:id", async function(req, res) {
    try {
    const customer = await Customer.findById(req.params.id);
    return res.status(200).send(customer);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- PUT (Update) ----
router.put("/:id", async function(req, res) {
    const {error} = validateName(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}); 
        return res.status(200).send(customer);
    } catch (error) {
        return res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
//& ---- DELETE (Delete) ----
router.delete("/:id", async function(req, res) {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        res.status(200).send(customer);
    } catch (error) {
        res.status(404).send(`Berilgan ID li kitob topilmadi`);
    }
});
// //& ---- DELETE (Delete All) ----
router.delete("/", async function(req, res) {
    try {
        const customers = await Customer.remove();
        res.status(200).send(customers);
    } catch (error) {
        res.send("error");
    }
});

module.exports.router = router;