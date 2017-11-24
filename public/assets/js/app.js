
$(function(){
  console.log("JS file loaded");

  // save the scraped article
  $(".saveArticle").on("click", function(){
    console.log("button pressed");
    // event.preventDefault();
    var id = $(this).attr("data-articleId");

    $.ajax("/articles/" + id,{
      type:"POST",
      data: {body: "New Note"}
    }).then(function(data){
      console.log("article saved");
    });
  });

  // update user note
  $(".updateNote").on("click", function(){
    console.log("updateNote btn pressed");

  });

  // delete saved article
  $(".deleteArticle").on("click", function(){
    console.log("deleteArticle btn clicked");

    let id = $(this).attr("data-noteId");

    $.ajax("/article/" + id, {
      type: "DELETE"
    }).then(function(data){
      console.log("article was deleted");
      location.reload();
    })
  });




  // -------------------------------------------------------
  // $(".delplan").on("click", function(event) {
  //   var id = $(this).data("planid");
  //   // same as
  //   // var id = $(this).attr("data--planid");

  //   // Send the DELETE request.
  //   $.ajax("/todos/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       console.log("deleted id ", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $("#createplan").on("submit", function(event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();

  //   var newPlan = {
  //     plan: $("#createplan [name=plan]").val().trim()
  //   };

  //   // Send the POST request.
  //   $.ajax("/todos", {
  //     type: "POST",
  //     data: newPlan
  //   }).then(
  //     function() {
  //       console.log("created new plan");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $("#updateplan").on("submit", function(event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();
  //   // get value of dropdown menu options!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   var id = $("[name=id]").val().trim();

  //   var updatedPlan = {
  //     plan: $("#updateplan [name=plan]").val().trim()
  //   };

  //   // Send the PUT request.
  //   $.ajax("/todos/" + id, {
  //     type: "PUT",
  //     data: updatedPlan
  //   }).then(
  //     function() {
  //       console.log("updated id ", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
})