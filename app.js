const express = require('express')

const mongoose = require('./config/db');
const app=express();

const port=3000;


//ROUTE HANDLER
//app.method(path,Handler)

//logger middleware
app.use((req,res,next)=>{
	console.log(`${req.method}-${req.url}-${req.ip}-${new Date()}`);
	next();
})


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

app.listen(port,()=>{
	console.log(`listening on port ${port}`);
})