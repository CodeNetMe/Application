var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	
	link: {
		type: String,
		required: true
	},
	
	date: {
		type : Date,
		required : true
	},
	
	group: {
		type: mongoose.Schema.ObjectId, 
		ref: 'Group',
		required: true
		},
		
	questions: {
		type : [{type : mongoose.Schema.ObjectId, ref: 'Question'}]
	}


});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
