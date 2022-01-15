"use strick";
const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 //& ---- DataBase ----
 const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 250
    },
    category: {
        type: categorySchema,
        required: true,
    },
    trainer: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
    }
});
const Course = new mongoose.model("Course", courseSchema);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function validateCourse(course) {
    const scheem = Joi.object({
        title: Joi.string().min(2).max(250).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        status: Joi.string().required(),
    });
    return scheem.validate(course);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;