const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// this line lets your program use partials must be above the app.set and the app.use for view engine
// to have nodemon watch the hbs extension files you must add the e flag to the command line eg. next line
// nodemon server.js -e js, hbs
// this will make sure nodemon watches changes to both the handlebars and javascript files in your program
hbs.registerPartials(__dirname + "/views/partials");



app.use((req, res, next) => {
	let now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile("server.log", log + "\n", (err)=>{
		if(err){
		console.log('unable to append server log');
		}
	});

	next();
});



// app.use((req,res, next) => {
// 	res.render('maintenance.hbs')
// })


app.use(express.static(__dirname + "/public"));

app.set('view engine', "hbs");

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
})

hbs.registerHelper("screamIt", (text)=> {
	return text.toUpperCase();
})

app.get("/", (req, res) => {

	res.render("home.hbs", {
		name: "Dan",
		hobbies: ["gym", "concerts"],
		lastName: "McGhee",
		page: 'Home Page'
	});

})


app.get('/about', (req,res) =>{

	res.render("about.hbs", {
		pageTitle: "About Page"
	})
})



app.get("/bad", (req, res)=> {
	

	res.send({errorMessage: "Unable to handle request."});

})

app.get("/help", (req, res)=> {
	res.render("./public/help.html");
})

app.get('/projects', (req, res) => {
	res.render("projects.hbs", {
		projects: [],
		message: "Welcome to my projects page."
	})

})

app.listen(PORT, ()=> {
	console.log(`app is running on port ${PORT}`);
})