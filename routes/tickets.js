const express = require('express');

const {Ticket}= require('../models/ticket');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const router= express.Router();


router.get('/',(req,res)=>{
	Ticket.find().then((tickets)=>{
		res.send(tickets);
	})

});


router.post('/',(req,res)=>{
	let body=req.body;
	let ticket= new Ticket(body);
	ticket.save().then((ticket)=>{
		res.send({
			ticket,
			notice:"successfully created ticket"
		});
	})
	.catch((err)=>{
		res.send(err);
	})

});


router.get('/:id',(req,res)=>{
	id=req.params.id;
	
	if(!ObjectId.isValid(id)){
		res.send({
			notice:"invalid id"
		})

		return false;
	}
	Ticket.findById(id)
	.then((ticket)=>{
		res.send(ticket);
	})
	.catch((err)=>{
		res.send(err);
	});
});

router.delete('/:id',(req,res)=>{
	let id = req.params.id;
	Ticket.findByIdAndRemove(id)
	.then((ticket)=>{
		if(ticket){
		res.send({
			ticket,
			notice:"ticket successfully deleted"
		})}else
		{
			res.status(404).send({
				notice:"ticket not found"
			})
		}
	})
	.catch((err)=>{
		res.send(err)
	})
})


router.put('/:id',(req,res)=>{
	let id= req.params.id;
	let body= req.body;

	if(!ObjectId.isValid(id)){
		res.send({
			notice:"invalid id"
		})
		return false;
	}

	Ticket.findByIdAndUpdate(id,{$set:body},{new:true})
	.then((ticket)=>{
		res.send({
			ticket,
			notice:"successfully updated"
		});
	})
	.catch((err)=>{
		res.send(err);
	})
})




module.exports= router;