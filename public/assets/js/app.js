
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

  // test route to save note
  $(".saveNote").on("click", function(){
    console.log("save btn  pressed");

    var id = $(this).attr("data-articleId");

    console.log("id: ", id);

    var body = {body: ""};

    body.body = document.getElementById(id).value;

    console.log("body: ", body);

    $.ajax("/articles/" + id,{
      type:"POST",
      data: body
    }).then(function(data){
      console.log("article saved");

      location.reload();
    });
  });

  $("#startScrape").on("click", function(event){
    event.preventDefault();
    $.ajax("/scrape", {
      type:"GET"
    }).then(function(data){
      console.log("scraped!!");
    });
  });

  // get note id when press modal
  // let updateNoteId = {id:""};
  // $(".updateNote").on("click", function(){

  //   console.log("updateNote btn pressed");
  //   let id = $("this").attr("data-noteId");

  //   updateNoteId.id = $(this).attr("data-noteId");
  //   console.log("id: ", updateNoteId);
  // });

  // save user note from modal
  // $(".saveNote").on("click", function(){

  //   let note = {};
  //   note.note = $("#trimText").val().trim();

  //   console.log("id: ", updateNoteId);
  //   console.log("note: ", note);

  //   $.ajax("/note/" + updateNoteId.id, {
  //     type: "POST",
  //     data: note
  //   }).then(function(data){
  //     console.log("note was updated");
  //   });
  // });


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
