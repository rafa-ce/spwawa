'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController',LunchCheckFunction);

LunchCheckFunction.$inject = ['$scope'];

function LunchCheckFunction($scope) {
	$scope.items = "";
	$scope.message = "";

  $scope.check = function() {
    if ($scope.items == "") {
      $scope.message = "Please enter data first";
      return;
    }

    var totalItems = $scope.items.split(',').length;

    if (totalItems <= 3) {
      $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!";
    }
	}
};
