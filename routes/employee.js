const express = require('express');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const Employee=require('../models/employee');


const router= express.Router();

router.get('/',(req,res)=>{
	Employee.find().then((employee)=>{
		res.send(employee);
	})

});

router.post('/',(req,res)=>{
	let body=_.pick(req.body,['department','ageWhileJoining','email','salary','name']);

	let employee= new Employee(body);
	employee.save().then((employee)=>{
		res.send({
			employee,
			notice:"successfully created employee"
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
	Employee.findById(id)
	.then((employee)=>{
		res.send(employee);
	})
	.catch((err)=>{
		res.send(err);
	});
});

router.delete('/:id',(req,res)=>{
	let id = req.params.id;
	Employee.findByIdAndRemove(id)
	.then((employee)=>{
		if(employee){
		res.send({
			employee,
			notice:"employee successfully deleted"
		})}else
		{
			res.status(404).send({
				notice:"employee not found"
			})
		}
	})
	.catch((err)=>{
		res.send(err)
	})
})

router.put('/:id',(req,res)=>{
	let id= req.params.id;
	let body=_.pick(req.body,['department','priority','message']);

	if(!ObjectId.isValid(id)){
		res.send({
			notice:"invalid id"
		})
		return false;
	}

	Employee.findByIdAndUpdate(id,{$set:body},{new:true})
	.then((employee)=>{
		res.send({
			employee,
			notice:"successfully updated"
		});
	})
	.catch((err)=>{
		res.send(err);
	})
})



module.exports=router;