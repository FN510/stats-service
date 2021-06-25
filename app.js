const express = require("express");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
/* -- database --- */
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
// db models
const Session = require("./models/session");
const Course = require("./models/course");
const User = require("./models/user");
// db driver
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
	console.log("connected to db...");
})
.catch((err)=> {
	console.log("db connection failed");
});


// Each course has modules which are studied in sessions by a user

//---- routes ----

// Persists a session study event
app.post("/courses/:courseId", (req, res)=> {
	// check user param in header and user exists
	
	let userId = req.header("X-User-Id");
	if (!userId) {
		res.status(400).json({"error":"X-User-Id is not defined"})
	} else {
		// check user exists
		User.findById(userId)
		.then(data=> {
			if (data!=null) {
				console.log("user");
				// check course exists
				let courseId = req.params.courseId;
				Course.findById(courseId)
				.then(data=> {
					if (data!=null) {
						console.log("course");
						// check json body for session details
						if (req.body.hasOwnProperty("stats diff")) {
							let details = req.body["stats diff"]
							let sessionProps = ["sessionId", "totalModulesStudied", "averageScore", "timeStudied"];
							sessionProps.forEach(p=> {
								if (!details.hasOwnProperty(p)) {
									res.status(400).json({"error":"stats diff object is missing key: "+ p});
								}
							});
							// check sessionId doesn't already exist
							Session.findById(details.sessionId)
							.then(data=> {
								if (data!=null) {
									res.status(400).json({"error": "SessionId already exists"})
								}
							})
							console.log("good post");
							let postSession = new Session({
								_id: new ObjectId(details.sessionId),
								userId: new ObjectId(userId),
									// courseId: new ObjectId(details.courseId),
									// totalModulesStudied: parseInt(details.totalModulesStudied),
									// averageScore: parseInt(details.averageScore),
									// timeStudied: parseInt(details.timeStudied)
							});
							postSession.save()
							.then(()=> res.status(201).json({"status": "OK"}))
							.catch((err)=> res.status(500).json({"error": err}));
						} else {
							res.status(400).json({"error":"Request body is missing key:'status diff'"});
						}
					} else {
						res.status(404).json({"error":"Course not found"});
					}
				})
			} else {
				res.status(404).json({"error":"User not found"});
			}
		})
	}
	
	
	

});

// Fetches course lifetime statistics
app.get("/courses/:courseId", (req, res)=> {

});

// Fetches a single study session
app.get("/courses/:courseId/sessions/:sessionId", (req, res) => {
	let courseId = req.params.courseId;
	let sessionId = req.params.sessionId;
	let userId = req.header("X-User-Id");
	if (!userId) {
		res.status(400).json({"error":"X-User-Id is not defined"})
	}
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
			res.status(404).json({"error:":"Session not found"});
		}
	})
});


app.listen(3000, ()=> {
	console.log('Stats service running...');
});