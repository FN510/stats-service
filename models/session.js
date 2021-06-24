const mongoose = require('mongoose');
// Schema for a study session
const sessionSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
	courseId: {type: mongoose.Schema.Types.ObjectID, ref: 'Course'},
	totalModulesStudied: Number,
	averageScore: Number,
	timeStudied: Number
});
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;