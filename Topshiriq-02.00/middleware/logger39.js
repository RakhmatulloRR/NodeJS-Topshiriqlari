"use strict";
function log(req, res, next) {
    console.log(`Log yozish...`);
    next(); 
}
function autent(req, res, next) {
    console.log(`Autentifikatsiya yozish...`);
    next(); 
}
module.exports.fLog = log;
module.exports.fAutent = autent;