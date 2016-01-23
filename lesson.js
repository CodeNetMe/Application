var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	
	link: {
		type: String,
		required: true
	},
	
	date: {
		type : date,
		required : true
	},
	
	group: {
		type: mongoose.Schema.ObjectId, 
		ref: 'Group',
		required: true
		}
	
}


);

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
