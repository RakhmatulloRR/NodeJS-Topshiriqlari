"use strick";
const Joi = require('joi');
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
    bonusPoint: Number,

});
const Customer = new mongoose.model("Customer", customerSchema);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function validateCustomer(Customer) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required(),
        bonusPoint: Joi.number().min(0)
    });
    return schema.validate(Customer);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;