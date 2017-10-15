var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
	title:{
		type: String,
	},
	genre:{
		type: String,
	},
	length:{
		type: Number,
	}
});

module.exports = mongoose.model('Movie', movieSchema);