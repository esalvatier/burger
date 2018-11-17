var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    //access orm selectAll function, passing in the table and a callback
    orm.selectAll("burgers", function(res) {
      console.log(res);
      cb(res)
    });
  },

  create: function(columns, values, cb) {
    //access orm insertOne function, passing in table and the columns and values to be insert into the database, along with a callback
    orm.insertOne("burgers", columns, values, function(res) {
      cb(res);
    });
  },

  update: function(objValCols, condition, cb) {
    //access orm updateOne function; passing in table along with a object containing the values and columns to be changes as key value pairs and the condition
    orm.updateOne("burgers", objValCols, condition, function(res) {
      cb(res);
    });
  }
}

module.exports = burger;