const express = require("express");
const app = express();
/* -- database --- */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
	console.log("connected to db...");
})
.catch((err)=> {
	console.log("db connection failed");
});


// Each course has modules which are studied in sessions by a user
const userSchema = new mongoose.Schema({
	name: String
});
const User = mongoose.model('User', userSchema);

const courseSchema = new mongoose.Schema({
	name: String
});
const Course = mongoose.model('Course', courseSchema);

// Schema for a study session
const sessionSchema = new mongoose.Schema({
	userId: String,
	courseId: String,
	totalModulesStudied: Number,
	averageScore: Number,
	timeStudied: Number
});
const Session = mongoose.model('Session', sessionSchema);


//---- routes ----

// Persists a session study event
app.post("/courses/:courseId", (req, res)=> {
	res.send(req)
});

// Fetches course lifetime statistics
app.get("/courses/:courseId", (req, res)=> {
   
});

// Fetches a single study session
app.get("/courses/:courseId/sessions/:sessionId");


app.listen(3000, ()=> {
	console.log('Stats service running...');
});