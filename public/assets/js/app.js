
$(function(){
  console.log("JS file loaded");

  // save the scraped article
  $(".saveArticle").on("click", function(){
    console.log("button pressed");

    var id = $(this).attr("data-articleId");

    $.ajax("/articles/" + id,{
      type:"POST",
      data: {body: "New Note"}
    }).then(function(data){
      console.log("article saved");
    });
  });

  // route to save note
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

  // scrape articles
  $("#startScrape").on("click", function(event){
    event.preventDefault();
    $.ajax("/scrape", {
      type:"GET"
    }).then(function(data){
      console.log("scraped!!");
      location.reload();
      alert("scarape completed!");
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



})
