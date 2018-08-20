const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	department:{
		type:String,
		enum:['Technical','Sales','Hr'],
		required:true
	},
	salary:{
		type:Number,
		required:true
		
	},
	email:{
		type:String,
		required:true
	},
	ageWhileJoining:{
		type:Number,
		min:18,
		max:65,
		required:true
		
	}
});

const Employee = mongoose.model('employee',employeeSchema);

module.exports=Employee;