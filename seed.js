const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
// db models
const Session = require("./models/session");
const Course = require("./models/course");
const User = require("./models/user");
// db driver
mongoose.connect('mongodb+srv://testUser:S8c42xHbXB6MQem@cluster0.csliv.mongodb.net/stats?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
	console.log("connected to db...");
})
.catch((err)=> {
	console.log("db connection failed");
});
// users
// var alice = new User({name:"Alice"});
// alice.save();
// var bob = new User({name:"Bob"});
// bob.save()
// var chip = new User({name:"Chip"});
// chip.save();

// courses
// var maths = new Course({name: "Maths"});
// maths.save();
// var english = new Course({name: "English"});
// english.save();

// sessions
// User.findOne({name:"Alice"})
// .then(data=> {
//     let userId = data._id;
//     Course.findOne({name: "Maths"})
//     .then(data=> {
//         let courseId = data._id;
//         Session.insertMany([
//             {userId: userId, courseId: courseId, totalModulesStudied: 11, averageScore: 91, timeStudied: 60*1000*180},
//             {userId: userId, courseId: courseId, totalModulesStudied: 20, averageScore: 71, timeStudied: 60*1000*73},
//             {userId: userId, courseId: courseId, totalModulesStudied: 5, averageScore: 61, timeStudied: 60*1000*120},
//         ]).then(console.log("saved"));
//     }) 
    
// });

// User.findOne({name:"Chip"})
// .then(data=> {
//     let userId = data._id;
//     Course.findOne({name: "English"})
//     .then(data=> {
//         let courseId = data._id;
//         Session.insertMany([
//             {userId: userId, courseId: courseId, totalModulesStudied: 3, averageScore: 50, timeStudied: 60*1000*10},
//             {userId: userId, courseId: courseId, totalModulesStudied: 1, averageScore: 99, timeStudied: 60*1000*5},
//             {userId: userId, courseId: courseId, totalModulesStudied: 19, averageScore: 82, timeStudied: 60*1000*120},
//         ]).then(console.log("saved"));
//     }) 
    
// })

// User.findOne({name:"Bob"})
// .then(data=> {
//     let userId = data._id;
//     Course.findOne({name: "English"})
//     .then(data=> {
//         let courseId = data._id;
//         Session.insertMany([
//             {userId: userId, courseId: courseId, totalModulesStudied: 12, averageScore: 71, timeStudied: 60*1000*100},
//             {userId: userId, courseId: courseId, totalModulesStudied: 5, averageScore: 64, timeStudied: 60*1000*20},
//             {userId: userId, courseId: courseId, totalModulesStudied: 6, averageScore: 63, timeStudied: 60*1000*60},
//         ]).then(console.log("saved"));
//     }) 
    
// })

User.findOne({name:"Bob"})
.then(data=> {
    let userId = data._id;
    Course.findOne({name: "Maths"})
    .then(data=> {
        let courseId = data._id;
        Session.insertMany([
            {userId: userId, courseId: courseId, totalModulesStudied: 3, averageScore: 85, timeStudied: 60*1000*100},
            {userId: userId, courseId: courseId, totalModulesStudied: 3, averageScore: 90, timeStudied: 60*1000*20},
            {userId: userId, courseId: courseId, totalModulesStudied: 17, averageScore: 87, timeStudied: 60*1000*60},
        ]).then(console.log("saved"));
    }) 
    
})