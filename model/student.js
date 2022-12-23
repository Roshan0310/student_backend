let Mongoose = require("mongoose");

const studentSchema = Mongoose.Schema(
    {
        name: String,
        rollnumer : Number,
        admissionNo : {
            type : Number,
            required : true
        },
        college : String
    }
);

let studentModel = Mongoose.model("Students",studentSchema);

module.exports = {studentModel};