const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const travelSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
		userId: {
			type: String,
		},
	},
	{ timestamps: true }
);

// Create a model based on the schema
const Travel = mongoose.model("Travel", travelSchema);

// Export the model
module.exports = Travel;
