require("dotenv").config();

module.exports = {
	SERVER_PORT: process.env.SERVER_PORT,
	URI: process.env.MONGODB_ATLAS_CONNECTION,
};
