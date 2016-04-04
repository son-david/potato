var app = angular.module('app',['ngSanitize','infinite-scroll'])
var jsonFlickrFeed;

app.controller('mainControl', function ($scope, service) {

  $scope.data;
  $scope.newdata;

  $scope.modalShow = false;
  $scope.modal = null;

  service.getFeed(function (data) {
    $scope.data = data;
  });

  $scope.tagSearch = function (string) {
    var tags = string.split(' ');
    for (var i =0; i < tags.length; i++) {
      if (tags[i] == $scope.search){
        return true;
      }
    }
    return false;
  }

  $scope.calcDate = function (unixDate) {
    var x = new Date(unixDate);

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = x.getFullYear();
    var month = months[x.getMonth()];
    var date = x.getDate();
    var hour = x.getHours();
    var min = x.getMinutes();
    min = min.length == 2 ? min : '0'+min;
    var time = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + min;
  
    return time;
  }

  $scope.openModal = function (info) {
    $scope.modal = info;
    $scope.modalShow = true;
  }

  $scope.closeModal = function () {
    $scope.modalShow = false;
  }

  $scope.getDescription = function (modal) {
    if (!modal) {
      return;
    }
    var text = angular.element(modal.description);
    text = text[text.length-1];
    return text.innerText || text.textContent;
  }

  $scope.test = function () {
    service.getFeed(function (data) {
      console.log(typeof data);
      $scope.newdata = data;
    });
  }

});



app.service('service', function ($http) {

  this.getFeed = function (callback) {
    jsonFlickrFeed = callback;

    var url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json';
    $http.jsonp(url);
  }

});

