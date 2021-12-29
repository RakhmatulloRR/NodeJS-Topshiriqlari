'use strick';
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test")
    .then((result) => {
        console.log(`MongoDB ga ulanish hosil qilindi...`);
    }).catch((err) => {
        console.log("MongoDB ga ulanishda hatolik yuz berdi...", err);
    });

const sizeScheme = mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
});

const inventoryScheme = mongoose.Schema({
    item: String,
    qty: Number,
    size: sizeScheme,
    status: String
}, {collection: "inventory"});

const Inventory = mongoose.model("inventory", inventoryScheme);
async function getInventoryItems() {
    return await Inventory.find({
            status: "A"
        })
        .sort({
            item: 1
        })
        .select({
            item: 1,
            qty: 1,
            _id: 0
        });
}
async function run() {
    const items = await getInventoryItems();
    console.log(items);
}
run();