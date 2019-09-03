(function () {
  'use strict';
  angular.module(
    'scrumboard.demo',
    [])
    .controller(
      'ScrumboardController',
      ['$scope', '$http', ScrumboardController]);

  function ScrumboardController($scope, $http) {
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

    $scope.login = function() {
      $http.post('/auth_api/login/', { username: 'user1', password: 'user12345678'})
    };

    $scope.data = [];
    $http.get('/scrumboard/lists/').then(
      function(response) {
        $scope.data = response.data;
      }
    );
  }
}());