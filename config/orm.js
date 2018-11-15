var connection = require("./connection");

function qString(n) {
  var result= [];
  for (var i = 0; i < n; i ++) {
    result.push("?");
  }
  return result.toString();
}

function objToSQL(obj) {
  var result = [];

  for (var key in obj) {
    var value = obj[key];

    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      result.push(key + "=" + value);
    }
  }

  return result.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryStr = "SELECT * FROM " + table + ";";
    connection.query(queryStr, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },

  insertOne: function(table, columns, values, cb) {
    var queryStr = "INSERT INTO " + table;
    queryStr += " (" + columns.toString() + ") ";
    queryStr += "VALUES (" + qString(columns.length) + ") ";
    connection.query(queryStr, values, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    var queryStr = "UPDATE " + table;
    queryStr += " SET ";
    queryStr += objToSQL(objColVals);
    queryStr += " WHERE " + condition;
    console.log(queryStr);
    connection.query(queryStr, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  }
};

module.exports = orm;