const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    empId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    salary: { type: Number, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, required: true }
},{
    timestamps: true
});

const model = mongoose.model("emp", schema);

exports.EmpModel = model;

