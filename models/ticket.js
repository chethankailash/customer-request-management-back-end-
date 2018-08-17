const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	department:{
		type:String,
		enum:['Technical','Sales','Hr'],
		required:true
	},
	priority:{
		type:String,
		enum:['High','Medium','Low'],
		required:true
	},
	message:{
		type:String,
		required:true,
		minlength:5,
		maxlength:128
	},
	status:{
		type:String,
		default:'open'
	}
});

const Ticket = mongoose.model('ticket',ticketSchema);

module.exports={
	Ticket
}