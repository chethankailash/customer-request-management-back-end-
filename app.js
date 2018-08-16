const express = require('express')
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
	})
})


app.listen(port,()=>{
	console.log(`listening on port ${port}`);
})