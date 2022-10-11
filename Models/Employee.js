// import mongoose from "mongoose";
const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
  empId:{type:String,required:true},
  email:{type:String,required:true},
  name:{type:String,required:true},
  password:{type:String,required:true},
  designation:{type:String},
  phoneNumber:{type:String},
  department:{type:String},
  status:{type:Boolean,default:true},
  logIn:[String],
  logOut:[String],
  averageTime:[Number]
})

exports.Employee=mongoose.model('Employee',employeeSchema);
