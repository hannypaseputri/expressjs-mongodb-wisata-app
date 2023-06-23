const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create a new schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
