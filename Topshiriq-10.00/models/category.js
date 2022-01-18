"use strick";
const Joi = require('joi');
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

function validateCatgory(category) {
    const categoryScheem = Joi.object({
        name: Joi.string().min(2).required()
    });
    return categoryScheem.validate(category);
}
module.exports.categorySchema = categorySchema;
module.exports.Category = Category;
module.exports.validateCatgory = validateCatgory;