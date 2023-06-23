const express = require("express");
const app = express();
const config = require("./app/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/** Import Router --> Here <-- */
app.get("/", (req, res) => {
	res.send({
		message: "Welcome to NodeJS-Express with MongoDB : Wisata API",
	});
});

const AuthRoute = require("./app/routes/AuthRoute");
const TravelRoute = require("./app/routes/TravelRoute");

app.use("/api", AuthRoute);
app.use("/api/travel", TravelRoute);

/** End Import Router */

/** Listen Port Server */
app.listen(config.SERVER_PORT, () =>
	console.log(`Server is running on port ${config.SERVER_PORT}`)
);

/** Connect To Database */
mongoose
	.connect(config.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		bufferCommands: true,
	})
	.then(() => console.log(`MongoDB is running on URL : ${config.URI} `))
	.catch((err) => console.log(err));
