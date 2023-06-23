const Travel = require("../models/TravelModel");

fetchAll = (req, res) => {
	Travel.find()
		.then((travels) => {
			res.status(200).send({
				code: 200,
				message: "Success",
				travels: travels,
			});
		})
		.catch((err) => {
			res.status(500).send({
				code: 500,
				message:
					err.message ||
					"Some error occurred while retrieving Gemar Baca.",
			});
		});
};

store = (req, res) => {
	// Validate request
	if (!req.body.title) {
		return res.status(400).send({
			code: 400,
			message: "Title harus diisi!",
		});
	}

	if (!req.body.description) {
		return res.status(400).send({
			code: 400,
			message: "Deskripsi harus diisi!",
		});
	}

	// Create a Travel
	const travel = new Travel({
		title: req.body.title,
		description: req.body?.description,
		image: req.body?.image,
		userId: req.body?.userId,
	});

	// Save Travel in the database
	travel
		.save()
		.then((data) => {
			res.status(201).send({
				code: 201,
				message: "Success",
				travel: data,
			});
		})
		.catch((err) => {
			res.status(500).send({
				code: 500,
				message:
					err.message ||
					"Some error occurred while creating the Travel.",
			});
		});
};

updateTravel = (req, res) => {
	// Find Travel and update it with the request body
	Travel.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			description: req.body?.description,
			image: req.body?.image,
			userId: req.body?.userId,
		},
		{ new: true }
	)
		.then((travel) => {
			if (!travel) {
				return res.status(404).send({
					code: 404,
					message: "Travel not found with id " + req.params.id,
				});
			}
			res.status(200).send({
				code: 200,
				message: "Success",
				travel: travel,
			});
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					code: 404,
					message: "Travel not found with id " + req.params.id,
				});
			}
			return res.status(500).send({
				code: 500,
				message: "Error updating Travel with id " + req.params.id,
			});
		});
};

deleteTravel = (req, res) => {
	Travel.findByIdAndRemove(req.params.id)

		.then((travel) => {
			if (!travel) {
				return res.status(404).send({
					code: 404,
					message: "Travel not found with id " + req.params.id,
				});
			}
			res.status(200).send({
				code: 200,
				message: "Success",
			});
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					code: 404,
					message: "Travel not found with id " + req.params.id,
				});
			}
			return res.status(500).send({
				code: 500,
				message: "Could not delete Travel with id " + req.params.id,
			});
		});
};

module.exports = { fetchAll, store, updateTravel, deleteTravel };
