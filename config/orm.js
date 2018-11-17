var connection = require("./connection");

//creates an array of questions marks to allow easier sql query construction
function qString(n) {
  var result= [];
  for (var i = 0; i < n; i ++) {
    result.push("?");
  }
  return result.toString();
}

//creates an array containing sql equality statements from an object's key value pairs
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
  //takes in table name and callback function, querris all data from the table and performs the callback on the result
  selectAll: function(table, cb) {
    var queryStr = "SELECT * FROM " + table + ";";
    connection.query(queryStr, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },

  //inserts a new entry into a table with the passed columns and values, performs passed callback function on the returned result from the table
  insertOne: function(table, columns, values, cb) {
    var queryStr = "INSERT INTO " + table;
    queryStr += " (" + columns.toString() + ") ";
    queryStr += "VALUES (" + qString(columns.length) + ") ";
    connection.query(queryStr, values, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  //takes in a table name, and object containing the updated information and column name as key value pairs, a condition for where to update and a callback function, then updates table based on that information
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