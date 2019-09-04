(function () {
  'use strict';

  angular.module(
    'scrumboard.demo',
    ['ngRoute'])
    .controller(
      'ScrumboardController',
      ['$scope', '$http', ScrumboardController]);

  function ScrumboardController($scope, $http, $location) {
    $scope.add = function (list, title) {
      var card = {
        card_list: list.id,
        title: title
      };
      $http.post('/scrumboard/cards/', card)
        .then(function(response) {
          list.cards.push(response.data);
        },
        function() {
          alert("coud not create card")
        })
    };

    $scope.logout = function() {
      $http.get('/auth_api/logout/')
        .then(function() {
          $location.url('/login');
        });
    }

    $scope.data = [];
    $http.get('/scrumboard/lists/').then(
      function(response) {
        $scope.data = response.data;
      }
    );
    $scope.sortBy='story_points';
    $scope.reverse=true;
    $scope.showFilters=false;
  }
}());