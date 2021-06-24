const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
  }));
/* -- database --- */
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
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
	userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
	courseId: {type: mongoose.Schema.Types.ObjectID, ref: 'Course'},
	totalModulesStudied: Number,
	averageScore: Number,
	timeStudied: Number
});
const Session = mongoose.model('Session', sessionSchema);


//---- routes ----

// Persists a session study event
app.post("/courses/:courseId", (req, res)=> {
	// check user param in header and user exists
	

});

// Fetches course lifetime statistics
app.get("/courses/:courseId", (req, res)=> {

});

// Fetches a single study session
app.get("/courses/:courseId/sessions/:sessionId", (req, res) => {
	let courseId = req.params.courseId;
	let sessionId = req.params.sessionId;
	let userId = req.header("X-User-Id");
	let sessionQuery = {
		_id: new ObjectId(sessionId),
		courseId: new ObjectId(courseId),
		userId: new ObjectId(userId)
	}
	Session.findOne(sessionQuery)
	.then(data=> {
		if (data!=null && typeof data =="object") {
			let result = {
				"sessionId": data._id,
				"totalModulesStudied": data.totalModulesStudied,
				"averageScore": data.averageScore,
				"timeStudied": data.timeStudied
			};
			res.json(result);
		} else {
			res.send("Not found");
		}
	})
});


app.listen(3000, ()=> {
	console.log('Stats service running...');
});