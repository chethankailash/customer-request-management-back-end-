const express = require('express');

// const _ = require('lodash');

const bodyParser= require('body-parser');

const {ObjectId} = require('mongodb');

const mongoose = require('./config/db');



// const Employee=require('./models/employee');

// including routes
const ticketRouters= require('./routes/tickets');
const employeeRouters= require('./routes/employee');

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


//routers
app.use('/tickets',ticketRouters);
app.use('/employees',employeeRouters);


app.get('/',(req,res)=>{
	res.send({
		notice:'Welcome to the site'
	});
});





app.listen(port,()=>{
	console.log(`listening on port ${port}`);
})