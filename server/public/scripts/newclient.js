var app = angular.module('BookApp', []);

app.controller('BookController', ['$http', function($http){

  var self = this;

  self.bookList = [];
  self.newBook = {};

getBookData();

function getBookData(){
    $http({
      method: 'GET',
      url: '/books'
    }).then(function(response){
      console.log('response: ', response.data);
      self.bookList = response.data;
    })
  }

self.addBookData = function(){
  $http({
    method: 'POST',
    url: '/books/new',
    data: self.newBook,
  }).then(function(response){
    console.log(response);
    getBookData();
    self.newBook = {};
  })
}

self.deleteBook = function(bookID){
  $http({
    method: 'DELETE',
    url: '/books/delete/' + bookID
  }).then(function(response){
    console.log(response);
    getBookData();
  })
}

self.updateBook = function(book){
  $http({
    method: 'PUT',
    url: 'books/save/' + book.id,
    data: book
  }).then(function(response){
    console.log(response);
    getBookData();
  })
}













}]);//ends app.controller
