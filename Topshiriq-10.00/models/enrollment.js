"use strick";
const Joi = require('joi');
const mongoose = require('mongoose');
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 //& ---- DataBase ----
 const enrollmentSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 250
            },
        }),
        required: true
    },
    dateStart: {
        type: Date, required: true, default: Date.now,
    },
    courseFee: {
        type: Number,
        min: 0
    }
});
const Enrollment = new mongoose.model("Enrollment", enrollmentSchema);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function validateEnrollment(enrollment) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),
    });
    return schema.validate(enrollment);
}

module.exports.Enrollment = Enrollment;
module.exports.validateEnrollment = validateEnrollment;