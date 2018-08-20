const express = require('express');

const bodyParser= require('body-parser');

const {ObjectId} = require('mongodb');

const mongoose = require('./config/db');

const {Ticket}=require('./models/ticket');

const Employee=require('./models/employee');

const app=express();

const port=3000;


//ROUTE HANDLER
//app.method(path,Handler)

//logger middleware



app.use((req,res,next)=>{
	console.log(`${req.method}-${req.url}-${req.ip}-${new Date()}`);
	next();
})

app.use(bodyParser.json());


app.get('/',(req,res)=>{
	res.send({
		notice:'Welcome to the site'
	});
});

app.get('/about',(req,res)=>{
	res.send({
		notice:"about us page"
	});
});

app.get('/products/:id',(req,res)=>{
	let id= req.params.id;
	res.send({
		notice:`you asked for products ${id}`
	});
});

app.get('/users/:uid/orders/:oid',(req,res)=>{
	let uid= req.params.uid;
	let oid= req.params.oid;
	res.send({
		notice:`user:${uid}-order:${oid}`
	});
});


//all tickets GET

app.get('/tickets',(req,res)=>{
	Ticket.find().then((tickets)=>{
		res.send(tickets);
	})

});
// get all employee
app.get('/employees',(req,res)=>{
	Employee.find().then((employee)=>{
		res.send(employee);
	})

});


//create record
app.post('/tickets',(req,res)=>{
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
// creating record for employee
app.post('/employees',(req,res)=>{
	let body=req.body;
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

//find one

app.get('/tickets/:id',(req,res)=>{
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

//find one employee
app.get('/employees/:id',(req,res)=>{
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

// delete
app.delete('/tickets/:id',(req,res)=>{
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

app.delete('/employees/:id',(req,res)=>{
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

//update

app.put('/tickets/:id',(req,res)=>{
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

app.put('/employees/:id',(req,res)=>{
	let id= req.params.id;
	let body= req.body;

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

app.listen(port,()=>{
	console.log(`listening on port ${port}`);
})