console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',
      url: '/books',
      success: function(response) {
        console.log('response', response); //response is array of book objects
        $('#bookShelf').empty(); //clears books in bookShelf
        for (var i = 0; i < response.length; i++) {
          var currentBook = response[i]; //loops through books - this is an object
          var $newBook = $('<tr>'); //creating new row for each book
          $newBook.data('id', currentBook.id);
          $newBook.append('<td><input value="'+ currentBook.title + '" class="bookTitle"></td>');
          $newBook.append('<td><input value="'+ currentBook.author + '" class="bookAuthor"></td>');
          $newBook.append('<td><input value="'+ currentBook.edition + '" class="bookEdition"></td>');
          $newBook.append('<td><input value="'+ currentBook.publisher + '" class="bookPublisher"></td>');
          $newBook.append('<td><button class="deleteButton">Delete</button></td>');
          $newBook.append('<td><button class="saveButton">Save</button></td>');
          $('#bookShelf').prepend($newBook);
        }
      }
    });
  }

  $('#newBookForm').on('submit', function(event){
    event.preventDefault();
    var newBookObject = {};
    var formFields = $(this).serializeArray();

    formFields.forEach(function(field) {
      newBookObject[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
        $('#newBookForm > input').val('');
      }
    });
  });

  $('#bookShelf').on('click', '.deleteButton', function(){
    var idBookDelete = $(this).parent().parent().data().id;
    console.log('idBookDelete: ', idBookDelete);
    //for #48 -> /books/delete/48   this is called an optional parameter
    $.ajax({
      type: 'DELETE',
      url: 'books/delete/' + idBookDelete,
      success: function(response){
        console.log(response);
        getBookData();
      }
    })
  });

  $('#bookShelf').on('click', '.saveButton', function(){
    var idBookSave = $(this).parent().parent().data().id;
    var titleBookSave = $(this).parent().parent().find('.bookTitle').val();
    var authorBookSave = $(this).parent().parent().find('.bookAuthor').val();
    var editionBookSave = $(this).parent().parent().find('.bookEdition').val();
    var publisherBookSave = $(this).parent().parent().find('.bookPublisher').val();
    var bookObjectSave = {
      title: titleBookSave,
      author: authorBookSave,
      edition: editionBookSave,
      publisher: publisherBookSave
    };

    $.ajax({
      type: 'PUT',
      url: 'books/save/' + idBookSave,
      data: bookObjectSave,
      success: function(response){
        console.log(response);
        getBookData();
      }
    })
  });
  //


});//doc ready
