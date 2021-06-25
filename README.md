# Stats Service

## APIs
The express.js framework is being used to faciliate the API routing.

### GET /courses/:courseId
### POST /courses/:courseId
### GET /courses/:courseId/sessions/:sessionId
Looks for a session with id matching :sessionId, courseId matching :courseId and userId matching request.header.X-User-Id 
returns json

example status 200 response:

```JSON
{
"sessionId":"507f1f77bcf86cd799439011",
"courseId": "507f1f77bcf86cd799439111",
"totalModulesStudied": 7,
"averageScore": 81,
"timeStudied": 2220000
}
```

status 404 response
```JSON
{
"error": "Session not found"
}
```

status 400 response
```JSON
{
"error": "X-User-Id is required"
}
```

## Data Storage
The application is connected to an cloud instance of mongoDB, a noSQL database. A schema has been defined for a User, Course and Session.

### User
```javascript
const userSchema = new mongoose.Schema({
	name: String
});
```

### Course
```javascript
const courseSchema = new mongoose.Schema({
	name: String
});
```

### Session
```javascript
const sessionSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
	courseId: {type: mongoose.Schema.Types.ObjectID, ref: 'Course'},
	totalModulesStudied: Number,
	averageScore: Number,
	timeStudied: Number
});
```

## Testing
There is a [postman](http://postman.com) collection in the test folder. Each request in the postman collection has a series of tests that are run when a request is sent.
