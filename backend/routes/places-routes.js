const express = require("express");

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesControllers.getPlaceByPlaceId);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post("/", placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;