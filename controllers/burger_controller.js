var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsDataObj = {
      burgers: data
    };
    res.render("index", hbsDataObj);
  });
});

router.post("/api/burgers", function(req, res) {
  var newBurger = req.body.name;
  burger.create(["burger_name"], newBurger, function(result){
    res.json({id: result.insertID});
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update({devoured: req.body.devoured}, condition, function(result){
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;