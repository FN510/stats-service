# Stats Service

## My Comments
- I assumed the averageScore should be to 1 dp
- I assumed the request body for saving a new session should contain a key 'status diff'
- I used mongoDBs ObjectID as IDs not a uuid
- I could/should do the aggregation at the database level via mongoose for speed

## To Run
From  root of folder:
```
npm start
```

## APIs
The [express.js](https://expressjs.com/) framework is being used to faciliate the API routing.

### GET /courses/:courseId
Fetches course lifetime statistics for a user
### POST /courses/:courseId
Saves a new session (using the request body)
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

example status 404 response
```JSON
{
"error": "Session not found"
}
```

status 400 response
```JSON
{
"error": "X-User-Id is not defined"
}
```

## Data Storage
The application is connected to a cloud instance of mongoDB, a noSQL database. A schema has been defined for a User, Course and Session. The Ids of the objects are [ObjectID](https://docs.mongodb.com/manual/reference/method/ObjectId/)s. The [mongoose](https://mongoosejs.com/) driver is being used as interface between mongodb and node.js.

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
There is a [postman](http://postman.com) collection in the test folder. Each request in the postman collection has a series of tests that are run when a request is sent. A global variable url should be set http://localhost:3000 in postman.

The aggregate function `aggStats()` is tested using the [chai assertion library](https://www.chaijs.com/api/assert/) with the [mocha](https://mochajs.org/#getting-started) test framework. Run
```
npm test
```
to test the aggregate function using the test cases in `test/test.js`.

### Some Data

The seed.js file was used to put some data into the database.

| Course  | courseId                 |
|---------|--------------------------|
| Maths   | 60d600393192904f2098442f |
| English | 60d600393192904f20984430 |
|         |                          | 


| User    | userId                   |
|---------|--------------------------|
| Alice   | 60d5fabf3cb70946c077f221 |
| Bob     | 60d5fabf3cb70946c077f222 |
| Chip    | 60d5fabf3cb70946c077f223 |



| User  | Courses        |
|-------|----------------|
| Alice | Maths          |
| Bob   | Maths, English |
| Chip  | English        |


| SessionId                | userId                   | courseId                 |
|--------------------------|--------------------------|--------------------------|
| 60d600393192904f2098443e | 60d5fabf3cb70946c077f221 | 60d600393192904f2098442f | 
| 60d600393192904f2098443f | 60d5fabf3cb70946c077f221 | 60d600393192904f2098442f | 
| 60d600393192904f20984440 | 60d5fabf3cb70946c077f221 | 60d600393192904f2098442f | 
|                          |                          |                          |
| 60d600393192904f20984442 | 60d5fabf3cb70946c077f223 | 60d600393192904f20984430 | 
| 60d600393192904f20984443 | 60d5fabf3cb70946c077f223 | 60d600393192904f20984430 | 
| 60d600393192904f20984444 | 60d5fabf3cb70946c077f223 | 60d600393192904f20984430 | 
|                          |                          |                          |
| 60d600393192904f20984445 | 60d5fabf3cb70946c077f222 | 60d600393192904f20984430 | 
| 60d600393192904f20984446 | 60d5fabf3cb70946c077f222 | 60d600393192904f20984430 | 
| 60d600393192904f20984447 | 60d5fabf3cb70946c077f222 | 60d600393192904f20984430 | 
|                          |                          |                          |
| 60d7427c21c21217a00533b2 | 60d5fabf3cb70946c077f222 | 60d600393192904f2098442f | 
| 60d7427c21c21217a00533b3 | 60d5fabf3cb70946c077f222 | 60d600393192904f2098442f | 
| 60d7427c21c21217a00533b4 | 60d5fabf3cb70946c077f222 | 60d600393192904f2098442f | 
