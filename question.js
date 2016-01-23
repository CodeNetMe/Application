var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	
	mainSentence: {
		type: String,
		required: true
	},
	
	a: {
		sentence: {
		type: String,
		required: true
		},
		
		correct: {
			type: Boolean,
			required: true
		}
	},
	
	b: {
		sentence: {
		type: String,
		required: true
		},
		
		correct: {
			type: Boolean,
			required: true
		}
	},
	
	c: {
		sentence: {
		type: String,
		required: true
		},
		
		correct: {
			type: Boolean,
			required: true
		}
	},
	
	d: {
		sentence: {
		type: String,
		required: true
		},
		
		correct: {
			type: Boolean,
			required: true
		}
	},
	
}


);

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
