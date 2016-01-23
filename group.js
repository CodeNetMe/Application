var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	
	title: {
		type: String,
		required: true,
		lowercase: true,
		index: { unique: true }
	},
	language: {
		type: String,
		required: true
	},
	level: {
		type: String,
		required: true
	},
	
	teacher: {
		type: mongoose.Schema.ObjectId, 
		ref: 'User',
		required: true
		},
		
	students: {
		type : [{type : mongoose.Schema.ObjectId, ref: 'User'}]
	}
	
	
}


);

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
