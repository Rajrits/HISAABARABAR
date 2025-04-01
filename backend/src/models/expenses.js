const mongoose = require("mongoose")
const expensesSchema = new mongoose.Schema({
    item:{
        type:String,
        // required:true
    },
    date:{
        type:String,
        // required:true
    },
    time:{
        type:String,
        // required:true
    },
    paidBy:{
        type:String,
        // required:true
    },
    cost:{
        type:Number,
        // required:true
    },
    costPerPerson:{
        type:String,
        // required:true
    }
})

const Expense = new mongoose.model("Expenses",expensesSchema);
module.exports = Expense