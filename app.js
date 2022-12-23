let Express = require("express");
let Mongoose = require("mongoose");
let Bodyparser =require("body-parser");
let Cors = require("cors");
const { studentModel } = require("./model/student");

let app = new Express();


app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}))

app.use(Cors())

Mongoose.connect("mongodb+srv://Roshan:Roshan5454@cluster0.dbtqtd9.mongodb.net/studentDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }

);

app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.post("/add",async(req,res)=>{
    let data = req.body;
    let student = new studentModel(data);
    await student.save(
        (err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err})
            }
            else{
                res.json({"Status":"Success","Data":data})
            }
        }
    );
    console.log(data);
   
})

app.post("/viewall",(req,res)=>{
     studentModel.find(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})     
            } else {
                res.json(data)
            }
        }
    )
})

app.post("/search",(req,res)=>{
    let data = req.body
    studentModel.find(data,
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})     
            } else {
                res.json(data)
            }
        }
    )
})

app.put("/update",(req,res)=>{
    let admissionNo = req.body.admissionNo;
    let data = req.body;
     studentModel.findOneAndUpdate(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
    )
})

app.delete("/delete",(req,res)=>{
    let admissionNo = req.body.admissionNo;
    let data = req.body;
     studentModel.findOneAndDelete(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
    )
})

app.listen(3000,()=>{
    console.log("Server has Started listening");
});

