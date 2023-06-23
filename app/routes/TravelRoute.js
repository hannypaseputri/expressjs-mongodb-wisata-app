const router = require("express").Router();
const TravelController = require("../controllers/TravelController");

router.get("/", TravelController.fetchAll);
router.post("/", TravelController.store);
router.put("/:id", TravelController.updateTravel);
router.delete("/:id", TravelController.deleteTravel);

module.exports = router;
