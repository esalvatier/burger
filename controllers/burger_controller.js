var express = require("express");

var router = express.Router();

var Burger = require("../models/burger.js");

router.get("/", function(req, res) {
  //access Burger all function and passes the returned data to handlebars for rendering to main page
  Burger.all(function(data) {
    var hbsDataObj = {
      burgers: data
    };
    res.render("index", hbsDataObj);
  });
});

router.post("/api/burgers", function(req, res) {
  //captures incoming data
  var newBurger = req.body.name;
  //access Burger reate function to create new burger in database, returns a json object containing the id of the newly create entry
  Burger.create(["burger_name"], newBurger, function(result){
    res.json({id: result.insertID});
  });
});

router.put("/api/burgers/:id", function(req, res) {
  //creates condition of "id = ?" where the ? is the id that has been clicked on in the html  
  var condition = "id = " + req.params.id;
  //access Burger update function and sends object containing the new data along with the condition
  Burger.update({devoured: req.body.devoured}, condition, function(result){
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;