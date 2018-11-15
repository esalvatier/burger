var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      console.log(res);
      cb(res)
    });
  },

  create: function(columns, values, cb) {
    orm.insertOne("burgers", columns, values, function(res) {
      cb(res);
    });
  },

  update: function(objValCols, values, cb) {
    orm.updateOne("burgers", objValCols, values, function(res) {
      cb(res);
    });
  }
}

module.exports = burger;