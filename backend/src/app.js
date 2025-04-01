const express = require("express")
const dotenv = require('dotenv');
const bodyParser = require("body-parser")
// const expense = require("./models/expenses");
const app = express();
const cors = require("cors");
const Expense = require("./models/expenses");
app.use(cors())
app.use(bodyParser.json())
require("./db/conn");
const port = process.env.PORT || 8000
dotenv.config();


app.post("/",async(req,res)=>{
    let expenses = new Expense();
    expenses.item = req.body.item;
    expenses.date = req.body.date;
    expenses.time = req.body.time;
    expenses.paidBy = req.body.paidBy;
    expenses.cost = req.body.cost;
    expenses.costPerPerson = req.body.costPerPerson;
   const doc = await expenses.save();
    
    // res.send(doc)
});
app.get("/",async(req,res)=>{
    const doc  = await Expense.find({})
    res.send(doc);
})
app.delete("/:id",async(req,res)=>{
    const {id} = req.params
    // console.log(req.params);
    const doc  = await Expense.deleteOne({_id:id});
    res.send(doc);
})
app.listen(port,()=>{
    console.log("Server is running");
})