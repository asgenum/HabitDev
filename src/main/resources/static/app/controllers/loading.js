angular.module('MainApp')
.controller('LoadingController', function($http, $scope, $state, $timeout) {
	$timeout(function(){
		$state.go('home');
	}, 7500);
});
