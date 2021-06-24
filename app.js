let express = require("express");

var app = express();

// Persists a session study event
app.post("/courses/:courseId");

// Fetches course lifetime statistics
app.get("/courses/:courseId", (req, res)=> {
   
});

// Fetches a single study session
app.get("/courses/:courseId/sessions/:sessionId");


app.listen(3000, ()=> {
	console.log('Stats service running...');
});