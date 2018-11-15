$(function() {
  $(".devour").on("click", function (event) {
    var id = $(this).data("id");
    var newDev = $(this).data("eaten");

    var changeDevoured = {
      devoured: newDev
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: changeDevoured
    }).then(
      function () {
        console.log("changed sleep to", newDev);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burger").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});