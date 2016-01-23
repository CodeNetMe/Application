var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	
	title: {
		type: String,
		required: true,
		lowercase: true,
		index: { unique: true }
	},
	category: {
		type: String,
		required: true
	},
	difficulty: {
		type: String,
		required: true
	},
	
	teacher: {
		type: mongoose.Schema.ObjectId, 
		ref: 'User'} 
		
	}
	


);

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
