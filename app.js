const express = require("express");
const app = express();
const ThingController = require("./controllers/thing.controller");

app.use(express.json());

// app.post("/things", ThingController.createThing);
// app.get("/things", ThingController.findAllThings);
app.route("/things")
    .get(ThingController.findAllThings)
    .post(ThingController.createThing)

app.route("/things/:idThing")
    .get(ThingController.findThingById)
    .delete(ThingController.deleteThingById)
    .patch(ThingController.updateThingById)

module.exports = app;
