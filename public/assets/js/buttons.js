$(function() {
  $(".devour").on("click", function (event) {
    //captures id and new state
    var id = $(this).data("id");
    var newDev = $(this).data("eaten");

    //creates object to be passed in put request
    var changeDevoured = {
      devoured: newDev
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: changeDevoured
    }).then(
      function () {
        console.log("changed devoured to", newDev);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    //create object to pass into post request
    var newBurger = {
      name: $("#burger").val().trim(),
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created burger");
        location.reload();
      }
    );
  });

});